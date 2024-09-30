import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
const network = {
	liskSepolia: {
		chainId: `0x${Number(4202).toString(16)}`,
		chainName: "Lisk Sepolia Testnet",
		nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
		rpcUrls: ["https://rpc.sepolia-api.lisk.com"],
		blockExplorerUrls: ["https://sepolia-blockscout.lisk.com"],
	},
};

export const Web3Context = createContext({
	acctState: {
		chainId: null,
		chainName: null,

		selectedAccount: null,
	},
	isLoading: false,
	balance: 0,
	connectWallet: () => {},
	getWalletBalance: () => {},
	switchNetwork: () => {},
	handleLogout: () => {},
});

const Web3Provider = ({ children }) => {
	const [acctState, setAcctState] = useState({
		chainId: null,
		chainName: null,
		selectedAccount: null,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [balance, setBalance] = useState(0);

	useEffect(() => {
		connectWallet();

		window.ethereum.on("accountsChanged", handleAccountChange);
		window.ethereum.on("chainChanged", handleChainChange);
		return () => {
			window.ethereum.removeListener("accountsChanged", handleAccountChange);

			window.ethereum.removeListener("chainChanged", handleChainChange);
		};
	}, []);

	const connectWallet = async () => {
		try {
			setIsLoading(true);
			let chainId = null;
			if (!window.ethereum) {
				throw new Error("Metamask is not installed");
			}
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});

			let chainIdHex = await window.ethereum.request({
				method: "eth_chainId",
			});

			chainId = parseInt(chainIdHex, 16);

			let selectedAccount = accounts[0];
			// console.log(selectedAccount);
			getWalletBalance(selectedAccount);
			const provider = new ethers.BrowserProvider(window.ethereum);
			const chain = await provider.getNetwork();
			const chainName = chain.name;
			if (!selectedAccount) {
				throw new Error("no ethereum accounts is available");
			}
			setAcctState((prev) => {
				return { ...prev, selectedAccount, chainId, chainName };
			});
		} catch (error) {
			console.error("Error connecting Wallet: ", error.message);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const handleAccountChange = async () => {
		const accounts = await window.ethereum.request({
			method: "eth_accounts",
		});

		const selectedAccount = accounts[0];
		getWalletBalance(selectedAccount);

		setAcctState((prevState) => ({ ...prevState, selectedAccount }));
	};

	const handleChainChange = async () => {
		let chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
		const chainId = parseInt(chainIdHex, 16);
		const provider = new ethers.BrowserProvider(window.ethereum);
		const chain = await provider.getNetwork();
		const acct = await provider.getSigner();
		const balance =  await provider.getBalance(acct.address);
		const chainName = chain.name;
		const balanceInEther = ethers.formatEther(balance.toString());
		setBalance(balanceInEther);
		setAcctState((prevState) => ({ ...prevState, chainId, chainName }));
	};

	const getWalletBalance = async (account) => {
		console.log(account);
		try {
			const balance = await window.ethereum.request({
				method: "eth_getBalance",
				params: [account, "latest"],
			});

			const balanceInEther = ethers.formatEther(balance.toString());
			setBalance(balanceInEther);
		} catch (error) {
			console.error("Error fetching balance: ", error);
			throw error;
		}
	};

	const requestAccount = async () => {
		if (window.ethereum) {
			try {
				const accounts = await window.ethereum.request({
					method: "wallet_requestPermissions",
					params: [{ eth_accounts: {} }],
				});
				console.log(accounts);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleLogout = () => {
		try {
			if (window.ethereum && window.ethereum.isMetaMask) {
				setAcctState({ account: null, chainId: null });
				alert(
					"Successfully logged out. Please disconnect manually from MetaMask."
				);
			} else {
				alert("MetaMask is not installed");
			}
		} catch (error) {
			console.error("Error during logout:", error);
		}
	};
	const switchToLiskSepolia = async () => {
		try {
			await window.ethereum.request({
				method: "wallet_addEthereumChain",
				params: [network.liskSepolia],
			});
		} catch (error) {
			console.error("Error adding chain: ", error.message);
		}
	};

	const switchToETHChain = async () => {
		try {
			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: "0x1" }],
			});
		} catch (error) {
			console.error("Error switching chain: ", error.message);
		}
	};

	// console.log(acctState);

	return (
		<div style={{ height: "100vh" }}>
			<Web3Context.Provider
				value={{
					acctState,
					getWalletBalance,
					balance,
					switchToLiskSepolia,
					switchToETHChain,
					requestAccount,
					handleLogout,
					connectWallet,
				}}
			>
				{children}
			</Web3Context.Provider>
			{isLoading && <p>Loading...</p>}
		</div>
	);
};
export default Web3Provider;

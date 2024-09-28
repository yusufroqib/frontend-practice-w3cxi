import { useEffect, useState } from "react";

const network = {
	liskSepolia: {
		chainId: `0x${Number(4202).toString(16)}`,
		chainName: "Lisk Sepolia Testnet",
		nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
		rpcUrls: ["https://rpc.sepolia-api.lisk.com"],
		blockExplorerUrls: ["https://sepolia-blockscout.lisk.com"],
	},
};

const useWalletConnect = () => {
	const [state, setState] = useState({
		chainId: null,
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
			if (!selectedAccount) {
				throw new Error("no ethereum accounts is available");
			}
			setState((prev) => {
				return { ...prev, selectedAccount, chainId };
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
		setState((prevState) => ({ ...prevState, selectedAccount }));
	};

	const handleChainChange = async () => {
		let chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
		const chainId = parseInt(chainIdHex, 16);
		setState((prevState) => ({ ...prevState, chainId }));
	};

	const getWalletBalance = async (account) => {
		try {
			const balance = await window.ethereum.request({
				method: "eth_getBalance",
				params: [account, "latest"],
			});

			const balanceInEther = parseFloat(parseInt(balance, 16) / 1e18).toFixed(
				4
			);
			// return balanceInEther;
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
				setState({ account: null, chainId: null });
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

	return {
		requestAccount,
		handleAccountChange,
		handleLogout,
		switchToLiskSepolia,
		switchToETHChain,
		handleChainChange,
		state,
		isLoading,
		setState,
		getWalletBalance,
		balance,
		setBalance,
	};
};

export default useWalletConnect;

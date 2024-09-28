import { createContext } from "react";
import { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { connectWallet } from "../utils/connectWallet";
import WebButton from "../components/button/Button";
import { handleAccountChange } from "../utils/handleAccountChange";
import { handleChainChange } from "../utils/handleChainChange";

const network = {
	liskSepolia: {
		chainId: `0x${Number(4202).toString(16)}`,
		chainName: "Lisk Sepolia Testnet",
		nativeCurrency: {
			name: "Sepolia Ether",
			symbol: "ETH",
			decimals: 18,
		},
		rpcUrls: ["https://rpc.sepolia-api.lisk.com"],
		blockExplorerUrls: ["https://sepolia-blockscout.lisk.com"],
	},
};

export const Web3Context = createContext();

const Wallet = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isNetworkAdded, setIsNetworkAdded] = useState(true);
	const [state, setState] = useState({
		account: null,
		chainId: null,
	});

	useEffect(() => {
		const handleConnectAct = async () => {
			await handleWallet();
		};

		handleConnectAct();

		const handle_Account_Change = () => handleAccountChange(setState);
		const handle_Chain_Change = () => handleChainChange(setState);

		window.ethereum.on("accountsChanged", handle_Account_Change);
		window.ethereum.on("chainChanged", handle_Chain_Change);
		return () => {
			window.ethereum.removeListener("accountsChanged", handle_Account_Change);

			window.ethereum.removeListener("chainChanged", handle_Chain_Change);
		};
	}, []);

	const handleWallet = async () => {
		try {
			setIsLoading(true);
			const { selectedAccount, chainId } = await connectWallet();

			setState({
				selectedAccount,
				chainId,
			});
		} catch (error) {
			console.error("Error connecting Wallet: ", error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const switchToLiskSepolia = async () => {
		try {
			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: network.liskSepolia.chainId }],
			});
			const { selectedAccount, chainId } = await connectWallet();

			setState({
				selectedAccount,
				chainId,
			});
		} catch (error) {
			console.error("Error switching chain: ", error.message);
			if (error.code === 4902) {
				alert("Please add the Lisk Sepolia network to your MetaMask");
				setIsNetworkAdded(false);
			}
		}
	};

	const addLiskSepoliaChain = async () => {
		try {
			await window.ethereum.request({
				method: "wallet_addEthereumChain",
				params: [network.liskSepolia],
			});
			const { selectedAccount, chainId } = await connectWallet();

			setState({
				selectedAccount,
				chainId,
			});
			setIsNetworkAdded(true);
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
			const { selectedAccount, chainId } = await connectWallet();

			setState({
				selectedAccount,
				chainId,
			});
		} catch (error) {
			console.error("Error switching chain: ", error.message);
		}
	};

	async function requestAccount() {
		if (window.ethereum) {
			try {
				const accounts = await window.ethereum.request({
					method: "wallet_requestPermissions",
					params: [
						{
							eth_accounts: {},
						},
					],
				});
				console.log(accounts);
			} catch (error) {
				console.log(error);
			}
		}
	}

	const handleLogout = () => {
		try {
			if (window.ethereum && window.ethereum.isMetaMask) {
				setState({
					account: null,
					chainId: null,
				});
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

	return (
		<div style={{ height: "100vh" }}>
			<Web3Context.Provider value={state}>{children}</Web3Context.Provider>
			{isLoading && <p>Loading...</p>}
			<Flex justify={"space-between"}>
				{!state.selectedAccount && (
					<WebButton
						onClick={handleWallet}
						type="button"
						label="Connect Wallet"
					/>
				)}
				{state.selectedAccount && (
					<WebButton
						onClick={requestAccount}
						type="button"
						label="Change Account"
					/>
				)}
				{state.selectedAccount && state.chainId !== 4202 && isNetworkAdded && (
					<WebButton
						onClick={switchToLiskSepolia}
						type="button"
						label="Switch to Lisk Sepolia"
					/>
				)}
				{state.selectedAccount && state.chainId !== 4202 && !isNetworkAdded && (
					<WebButton
						onClick={addLiskSepoliaChain}
						type="button"
						label="Add Lisk Sepolia"
					/>
				)}

				{state.selectedAccount && state.chainId === 4202 && (
					<WebButton
						onClick={switchToETHChain}
						type="button"
						label="Switch to ETH Mainnet"
					/>
				)}
				{state.selectedAccount && (
					<WebButton onClick={handleLogout} type="button" label="Disconnect" />
				)}
			</Flex>
		</div>
	);
};
export default Wallet;

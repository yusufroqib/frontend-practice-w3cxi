import { connectWallet } from "../utils/connectWallet";

const network = {
	liskSepolia: {
		chainId: `0x${Number(4202).toString(16)}`,
		chainName: "Lisk Sepolia Testnet",
		nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
		rpcUrls: ["https://rpc.sepolia-api.lisk.com"],
		blockExplorerUrls: ["https://sepolia-blockscout.lisk.com"],
	},
};

export const useNetworkSwitching = (setState) => {
	const switchToLiskSepolia = async () => {
		try {
			await window.ethereum.request({
				method: "wallet_addEthereumChain",
				params: [network.liskSepolia],
			});
			const { selectedAccount, chainId } = await connectWallet();
			setState({ selectedAccount, chainId });
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
			setState({ selectedAccount, chainId });
		} catch (error) {
			console.error("Error switching chain: ", error.message);
		}
	};

	const handleChainChange = async (setState) => {
		let chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
		const chainId = parseInt(chainIdHex, 16);
		console.log(chainId);
		setState((prevState) => ({ ...prevState, chainId }));
	};

	return {
		switchToLiskSepolia,
		switchToETHChain,
		handleChainChange,
	};
};

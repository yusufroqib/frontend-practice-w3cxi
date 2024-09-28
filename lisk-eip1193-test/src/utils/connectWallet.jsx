import { ethers } from "ethers";

export const connectWallet = async () => {
	try {
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

		return { selectedAccount, chainId };
	} catch (error) {
		console.error(error);
		throw error;
	}
};

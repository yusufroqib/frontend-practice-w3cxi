import { Flex } from "@chakra-ui/react";
import React from "react";
import WebButton from "../button/Button";
import useWalletConnect from "../../hooks/useWalletConnect";

const Buttons = () => {
	const {
		state,
		handleWallet,
		switchToLiskSepolia,
		switchToETHChain,
		requestAccount,
		handleLogout,
	} = useWalletConnect();
	return (
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
			{state.selectedAccount && state.chainId !== 4202 && (
				<WebButton
					onClick={switchToLiskSepolia}
					type="button"
					label="Switch to Lisk Sepolia"
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
	);
};

export default Buttons;

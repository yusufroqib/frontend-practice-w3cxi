import { Flex } from "@chakra-ui/react";
import React, { useContext } from "react";
import WebButton from "../button/Button";
import { Web3Context } from "../../context/Web3Context";

const Buttons = () => {
	const {
		acctState,
		switchToLiskSepolia,
		switchToETHChain,
		requestAccount,
		handleLogout,
		connectWallet,
	} = useContext(Web3Context);
	return (
		<Flex justify={"space-between"} mt={6}>
			{!acctState.selectedAccount && (
				<WebButton
					onClick={connectWallet}
					type="button"
					label="Connect Wallet"
				/>
			)}
			{acctState.selectedAccount && (
				<WebButton
					onClick={requestAccount}
					type="button"
					label="Change Account"
				/>
			)}
			{acctState.selectedAccount && acctState.chainId !== 4202 && (
				<WebButton
					onClick={switchToLiskSepolia}
					type="button"
					label="Switch to Lisk Sepolia"
				/>
			)}

			{acctState.selectedAccount && acctState.chainId === 4202 && (
				<WebButton
					onClick={switchToETHChain}
					type="button"
					label="Switch to ETH Mainnet"
				/>
			)}
			{acctState.selectedAccount && (
				<WebButton onClick={handleLogout} type="button" label="Disconnect" />
			)}
		</Flex>
	);
};

export default Buttons;

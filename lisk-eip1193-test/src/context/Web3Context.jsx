import { createContext } from "react";
import { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import WebButton from "../components/button/Button";
import { useWalletConnection } from "../hooks/useWalletConnection";
import { useNetworkSwitching } from "../hooks/useNetworkSwitching";
import { useAccountRequest } from "../hooks/useAccountRequest";
import { useLogout } from "../hooks/useLogout";

export const Web3Context = createContext();

const Wallet = ({ children }) => {
	const { state, isLoading, handleWallet, setState } = useWalletConnection();
	const { switchToLiskSepolia, switchToETHChain, handleChainChange } =
		useNetworkSwitching(setState);
	const { requestAccount, handleAccountChange } = useAccountRequest();
	const { handleLogout } = useLogout(setState);

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
		</div>
	);
};
export default Wallet;

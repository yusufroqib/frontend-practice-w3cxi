import { createContext } from "react";
import { Flex } from "@chakra-ui/react";
import WebButton from "../components/button/Button";
import useWalletConnect from "../hooks/useWalletConnect";
import Buttons from "../components/navigation/Buttons";

export const Web3Context = createContext();

const WalletProvider = ({ children }) => {
	const { state, isLoading } = useWalletConnect();

	return (
		<div style={{ height: "100vh" }}>
			<Web3Context.Provider value={state}>{children}</Web3Context.Provider>
			{isLoading && <p>Loading...</p>}
			<Buttons />
		</div>
	);
};
export default WalletProvider;

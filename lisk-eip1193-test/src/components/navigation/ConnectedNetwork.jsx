import { useContext } from "react";
import {Web3Context} from "../../context/Web3Context";
import { Card, Heading, Text } from "@chakra-ui/react";

const ConnectedNetwork = () => {
	const { chainId } = useContext(Web3Context);
	if (chainId === 4202) {
		return (
			<Card padding={5}>
				<Heading>Connected Network</Heading>
				<Text padding={2}>Sepolia Lisk</Text>
			</Card>
		);
	} else {
		return (
			<Card padding={5}>
				<Heading>Connected Network</Heading>
				<Text padding={2}>Unsupported: 0x{chainId?.toString(16)}</Text>
			</Card>
		);
	}
};

export default ConnectedNetwork;

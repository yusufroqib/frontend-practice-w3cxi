import { useContext } from "react";
import {Web3Context} from "../../context/Web3Context";
import { Card, Heading, Text } from "@chakra-ui/react";

const ConnectedNetwork = () => {
	const { acctState } = useContext(Web3Context);
	if (acctState.chainId === 4202) {
		return (
			<Card padding={5}>
				<Heading>Connected Network</Heading>
				<Text padding={2}>0x{acctState.chainId}:Lisk Sepolia</Text>
			</Card>
		);
	} else {
		return (
			<Card padding={5}>
				<Heading>Connected Network</Heading>
				<Text padding={2}>
					{" "}
					0x{acctState.chainId}: {acctState.chainName}
				</Text>
			</Card>
		);
	}
};

export default ConnectedNetwork;

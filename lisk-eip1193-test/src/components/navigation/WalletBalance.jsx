import { useEffect, useState } from "react";
import { useContext } from "react";
import { Web3Context } from "../../context/Web3Context";
import { Button, Card, Heading, Input, Text } from "@chakra-ui/react";

const WalletBalance = () => {
	const { acctState, getWalletBalance, balance } =
		useContext(Web3Context);
	const [addressInput, setAddressInput] = useState("");

	// useEffect(() => {
	// 	getWalletBalance(acctState.selectedAccount);
	// }, [acctState.selectedAccount, acctState.chainId]);

	const handleBalanceCheck = (e) => {
		e.preventDefault();
		if (!addressInput) return;
		getWalletBalance(addressInput);
	};

	return (
		<Card padding={5}>
			<Heading>Wallet Balance</Heading>
			<form onSubmit={handleBalanceCheck}>
				<Input required onChange={(e) => setAddressInput(e.target.value)} />
				<Button mt={5} type="submit">
					Check Balance
				</Button>
			</form>
			<Text padding={2}>{balance}</Text>
		</Card>
	);
};

export default WalletBalance;

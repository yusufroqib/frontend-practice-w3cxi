import { useEffect, useState } from "react";
import { useContext } from "react";
import { Web3Context } from "../../context/Web3Context";
import { Button, Card, Heading, Input, Text } from "@chakra-ui/react";
import useWalletConnect from "../../hooks/useWalletConnect";

const WalletBalance = () => {
	const { selectedAccount, chainId } = useContext(Web3Context);
	const { state, isLoading, getWalletBalance, balance, setBalance } =
		useWalletConnect();
	const [addressInput, setAddressInput] = useState("");

	useEffect(() => {
		getWalletBalance(selectedAccount);
	}, [selectedAccount, chainId]);

	const handleBalanceCheck = (e) => {
		e.preventDefault();
		if (!addressInput) return;
		getWalletBalance(addressInput)
			.then((balance) => {
				setBalance(balance);
			})
			.catch((error) => console.log(error));
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

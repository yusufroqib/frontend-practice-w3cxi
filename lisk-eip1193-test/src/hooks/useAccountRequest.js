export const useAccountRequest = () => {
	const requestAccount = async () => {
		if (window.ethereum) {
			try {
				const accounts = await window.ethereum.request({
					method: "wallet_requestPermissions",
					params: [{ eth_accounts: {} }],
				});
				console.log(accounts);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleAccountChange = async (setState) => {
		const accounts = await window.ethereum.request({
            method: "eth_accounts",
		});

		const selectedAccount = accounts[0];
		console.log(selectedAccount);
		setState((prevState) => ({ ...prevState, selectedAccount }));
	};

	return { requestAccount, handleAccountChange };
};

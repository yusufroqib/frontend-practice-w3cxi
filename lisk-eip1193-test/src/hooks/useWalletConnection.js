import { useState } from "react";
import { connectWallet } from "../utils/connectWallet";

export const useWalletConnection = () => {
  const [state, setState] = useState({
    account: null,
    chainId: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleWallet = async () => {
    try {
      setIsLoading(true);
      const { selectedAccount, chainId } = await connectWallet();
      setState({ selectedAccount, chainId });
    } catch (error) {
      console.error("Error connecting Wallet: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { state, isLoading, handleWallet, setState };
};

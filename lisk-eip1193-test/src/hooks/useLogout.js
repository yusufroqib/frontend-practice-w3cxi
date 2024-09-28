export const useLogout = (setState) => {
    const handleLogout = () => {
      try {
        if (window.ethereum && window.ethereum.isMetaMask) {
          setState({ account: null, chainId: null });
          alert("Successfully logged out. Please disconnect manually from MetaMask.");
        } else {
          alert("MetaMask is not installed");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };
  
    return { handleLogout };
  };
  
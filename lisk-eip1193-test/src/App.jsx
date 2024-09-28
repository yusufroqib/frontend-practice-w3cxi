import "./App.css";
import Navigation from "./components/navigation/Navigation";
import WalletProvider from "./context/Web3Context";

function App() {
	return (
		<>
			<WalletProvider>
				<Navigation />
			</WalletProvider>
		
		</>
	);
}

export default App;

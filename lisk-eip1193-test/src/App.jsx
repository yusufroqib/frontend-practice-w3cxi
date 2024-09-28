import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Wallet from "./context/Web3Context";

function App() {
	return (
		<>
			<Wallet>
				<Navigation />
			</Wallet>
		
		</>
	);
}

export default App;

import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Web3Provider from "./context/Web3Context";

function App() {
	return (
		<Web3Provider>
			<Navigation />
		</Web3Provider>
	);
}

export default App;

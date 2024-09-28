import Quiz from "./components/Quiz";
import SelectedAnswerProvider from "./context/SelectedAnswerContext";

const App = () => {
	return (
		<SelectedAnswerProvider>
			<div className="bg-gray-500">
				<Quiz />
			</div>
		</SelectedAnswerProvider>
	);
};

export default App;

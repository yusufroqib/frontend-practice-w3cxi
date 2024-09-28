import { createContext, useState } from "react";

export const SelectedAnswerContext = createContext(null);

import React from "react";

const SelectedAnswerProvider = ({ children }) => {
	const [selectedAnswer, setSelectedAnswer] = useState({});
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [quizData, setQuizData] = useState([]);

	return (
		<SelectedAnswerContext.Provider
			value={{
				currentQuestionIndex,
				setCurrentQuestionIndex,
				selectedAnswer,
				setSelectedAnswer,
				quizData,
				setQuizData,
			}}
		>
			{children}
		</SelectedAnswerContext.Provider>
	);
};

export default SelectedAnswerProvider;

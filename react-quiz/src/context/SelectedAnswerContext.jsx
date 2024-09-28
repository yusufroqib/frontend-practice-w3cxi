import { createContext, useState } from "react";

export const SelectedAnswerContext = createContext(null);

import React from "react";

const SelectedAnswerProvider = ({ children }) => {
	const [selectedAnswer, setSelectedAnswer] = useState({});

	return (
		<SelectedAnswerContext.Provider value={{ selectedAnswer, setSelectedAnswer }}>
			{children}
		</SelectedAnswerContext.Provider>
	);
};

export default SelectedAnswerProvider;

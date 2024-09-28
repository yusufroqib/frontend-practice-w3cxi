import React, { useContext } from "react";
import { SelectedAnswerContext } from "../context/SelectedAnswerContext";

const Result = ({ score, quizLength, setShowResult, setRetry, quizData }) => {
	const { selectedAnswer } = useContext(SelectedAnswerContext);

	const decodeHtmlEntities = (str) => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(str, "text/html");
		return doc.documentElement.textContent;
	};

	const handleRetry = () => {
		setShowResult(false);
		setRetry(true);
	};
	return (
		<div className="space-y-2">
			<h2>Quiz Completed</h2>
			<p>
				Your score: {score} out of {quizLength}
			</p>

			<button
				className="bg-yellow-500 p-2 rounded-md disabled:opacity-30"
				onClick={handleRetry}
			>
				Retry
			</button>

			<div>
				<h3 className="text-2xl mb-3">Correction</h3>
				<div className="space-y-4">
					{quizData.map((item, index) => (
						<div className=" space-y-2" key={index}>
							<p
								className={
									selectedAnswer[index] === item.correct_answer
										? "text-green-600"
										: "text-red-500"
								}
							>
								{index + 1}. {decodeHtmlEntities(item.question)}
							</p>

							<div>
								<p className="pl-4">
									Your answer:{" "}
									{selectedAnswer[index] &&
										decodeHtmlEntities(selectedAnswer[index])}
								</p>
								<p className="pl-4">
									Correct answer: {decodeHtmlEntities(item.correct_answer)}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Result;

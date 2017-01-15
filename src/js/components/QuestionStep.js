import React, { PropTypes } from 'react';

const QuestionStep=({ step, numberOfIssues }) => {
	return (
		<div className="questionStep">
			<span>Question {step} of {numberOfIssues}</span>
		</div>
	);
};

QuestionStep.PropTypes={
	step: PropTypes.number.isRequired,
	numberOfIssues: PropTypes.number.isRequired
};

export default QuestionStep;
import React, { PropTypes } from 'react';

const QuestionContent=({ content }) => {
	return (
		<h2 className="question">{content}</h2>
	);
};

QuestionContent.PropTypes={
	content: PropTypes.string.isRequired
};

export default QuestionContent;
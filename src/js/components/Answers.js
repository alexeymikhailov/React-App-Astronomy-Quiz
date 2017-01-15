import React, { PropTypes } from 'react';

const Answers=({ answerList, questionId, onUserAnswer, onHandleSubmit, disableButton }) => {
	return (
		<div>
			<ul>
				{answerList[questionId].map((answer, index) => {
					return (
						<li key={`${questionId} - ${index}`} className="answerItem"> 
							<input type="radio" id={`answer_${index}`} 
									name="answer" value={index} 
									onChange={onUserAnswer} />
							<label htmlFor={`answer_${index}`}>
								{answer.content}
							</label>
						</li>
						
					);
				})}
			</ul>
			<button type="submit" className="furtherButton" 
					onClick={onHandleSubmit} disabled={disableButton}>
				Further
			</button>
		</div>
	);
};

Answers.PropTypes={
	answerList: PropTypes.array.isRequired,
	questionId: PropTypes.number.isRequired,
	onUserAnswer: PropTypes.func.isRequired,
	onHandleSubmit: PropTypes.func.isRequired,
	disableButton: PropTypes.bool.isRequired
};

export default Answers;
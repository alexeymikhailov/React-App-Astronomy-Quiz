import React, { PropTypes } from 'react';

const QuizResults=({ result, restart, percentage, numberOfTasks }) => {
	return (
		<div>	
			<div className="row">
				<div className="resultInfo">
					<h2>Result</h2>
	                <p className="percentage-info">{percentage > 50 ? `${percentage}% :)` : `${percentage}% :(`}</p>
            	</div>
	            <div className="resultInfo">
					<h2>Correct answers</h2>
					<p><span className="primaryScore">{result}</span> of {numberOfTasks}</p>
	            </div>
	        </div>
	        <button type="submit" className="restartButton" 
	        		onClick={restart}>
	        	Restart Astronomy Quiz
	        </button>
		</div>
	);
};

QuizResults.PropTypes={
	result: PropTypes.number.isRequired,
	restart: PropTypes.func.isRequired,
	percentage: PropTypes.number.isRequired,
	numberOfTasks: PropTypes.number.isRequired
};

export default QuizResults;
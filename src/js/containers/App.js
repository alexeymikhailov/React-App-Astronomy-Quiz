import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import questions from '../../../api/data';
import QuestionStep from '../components/QuestionStep';
import Question from '../components/Question';
import Answers from '../components/Answers';
import QuizResults from '../components/QuizResults';

class App extends Component {
	constructor(props) {
		super(props);

		this.state={
			questions: questions,
			questionId: 0,
			answers: [],
			userAnswer: [],
			result: 0,
			primaryScore: 0,
			disable: true
		};

		this.handleSubmit=(e) => {
			e.preventDefault();

			if (this.state.questionId + 2 <= this.state.questions.length) {
				this.setState({
					disable: true,
					questionId: this.state.questionId + 1
				});
			} else {
				this.showTheResult();
			}
		};

		this.handleUserAnswer=(e) => {
			let userAnswerInStep=[...this.state.userAnswer.slice(0, this.state.questionId), e.target.value];

			this.setState({
				disable: false,
				userAnswer: userAnswerInStep
			});
		};
	}

	componentWillMount() {
		const shuffleQuestions=this.shuffleArr(this.state.questions);
		const shuffleAnswers=this.state.questions.map((question) => {
			return this.shuffleArr(question.answers);
		});

		this.setState({
			questions: shuffleQuestions,
			answers: shuffleAnswers
		});
	}

	shuffleArr(arr) {
		// Fisher-Yates shuffle.
		for (let i=arr.length-1; i>=0; i--) {
			let randomIndex=Math.floor(Math.random() * arr.length);
			let currentItem=arr[i];

			arr[i]=arr[randomIndex];
			arr[randomIndex]=currentItem;
		}

		return arr;
	}

	restartQuestions() {
		return location.reload();
	}

	showTheResult() {
		let primaryScore=this.state.primaryScore;
		this.state.userAnswer.map((answer, i) => {
			primaryScore += this.state.questions[i].answers[answer].correct;
		});

		this.setState({
			result: 1,
			primaryScore
		});
	}

	render() {
		if (this.state.result) {
			return (
				<div>
					<div className="quiz-header">
						<h2>Quiz Application</h2>
						<h2>Astronomy Test</h2>
					</div>
					<div className="container">
						<QuizResults result={this.state.primaryScore} restart={this.restartQuestions} 
									percentage={Math.round(this.state.primaryScore * 100 / this.state.questions.length)} numberOfTasks={this.state.questions.length} />
					</div>
				</div>
			);
		} else {
			return (
				<div className="app">
					<div className="quiz-header">
						<h2>Quiz Application</h2>
						<h2>Astronomy Test</h2>
					</div>
					<ReactCSSTransitionGroup
						component="div"
						className="container"
						transitionName="fade"
						transitionEnterTimeout={900}
						transitionLeaveTimeout={600}
						transitionAppear={true}
						transitionAppearTimeout={600}>
						<QuestionStep step={this.state.questionId + 1} numberOfIssues={this.state.questions.length} />
						<Question content={this.state.questions[this.state.questionId].question} />
						<Answers answerList={this.state.answers} questionId={this.state.questionId} 
								onUserAnswer={this.handleUserAnswer} onHandleSubmit={this.handleSubmit} 
								disableButton={this.state.disable} />
					</ReactCSSTransitionGroup>
				</div>
			);
		}
		
	}
}

export default App;
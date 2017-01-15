import 'babel-polyfill';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import App from './containers/App';
import '../css/quiz-app.css';

ReactDOM.render(<App />, document.getElementById('root'));

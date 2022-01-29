import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import LoadingBar from 'react-redux-loading';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import middleware from './store/middleware';
import reducer from './store/reducers';

const store = createStore(reducer, middleware);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<LoadingBar />
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

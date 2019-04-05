import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import burgerReducer from './store/reducers/burderBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
	burgerBuilderReducer: burgerReducer,
	orderReducer: orderReducer,
	authReducer: authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();


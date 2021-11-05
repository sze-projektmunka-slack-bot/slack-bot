import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/main.scss';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

let store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App /> 
    </Provider>,
    document.getElementById('root')
);
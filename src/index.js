import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Resources/css/Icons.css'
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './Reducers'
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();

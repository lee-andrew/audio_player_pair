import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import allReducers from './reducers';
import Search from './containers/Search';
import thunk from 'redux-thunk';

import './index.css';

const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Search} />
            </Route>
        </Router>
    </Provider>
),
  document.getElementById('root')
);

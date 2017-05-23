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
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

injectTapEventPlugin();

// Custom theme
const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
});

// Create Store with redux
const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render((
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Search} />
                </Route>
            </Router>
        </MuiThemeProvider>
    </Provider>
),
  document.getElementById('root')
);
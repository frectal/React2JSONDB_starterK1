import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route
} from 'react-router-dom';
import {
    Router
} from 'react-router';
import { Provider } from 'react-redux';
import browserHistory from 'CHistory';
import IndexPage from './components/IndexPage';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={IndexPage} />
        </Router>
    </Provider>, document.getElementById('app'));

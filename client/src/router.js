import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/IndexPage';
import VocabPage from './routes/VocabPage';
import AdminPage from './routes/AdminPage';
import AudioPage from './routes/AudioPage';
import HomePage from './routes/HomePage';

export default function({ history }) {
  return (
    <Router history={history}>
        <Route path="/" component={IndexPage}>
            <Route path="vocab" component={VocabPage} />
            <Route path="audio" component={AudioPage} />
            <Route path="admin" component={AdminPage} />
            <IndexRoute component={HomePage} />
        </Route>
    </Router>
  );
};

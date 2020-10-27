import { Router, Route, Switch} from 'react-router-dom';
import React from 'react';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

import LoginPage from '../components/LoginPage';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={LoginPage} exact={true}></Route>
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} ></PrivateRoute>
                <PrivateRoute path="/create" component={AddExpensePage} ></PrivateRoute>
                <PrivateRoute path="/edit/:id" component={EditExpensePage} ></PrivateRoute>
                <Route path="/help" component={HelpPage} ></Route>
                <Route component={NotFoundPage} ></Route>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
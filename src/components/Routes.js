import React from "react";
import {Router, Route, browserHistory, withRouter} from "react-router";
import Main from "./Main";
import Designer from "./Designer";

export default  (
    <Router history={browserHistory}>
        <Route path="/" component={withRouter(Main)}>
            <Route path="/designer" component={Designer}/>
            <Route path="/bot/:shortId" component={Main} />
        </Route>
    </Router>
);
import React from "react";
import {Router, Route, browserHistory} from "react-router";
import BotTest from "./BotTest";
import Main from "./Main";
import Designer from "./Designer";

module.exports = (
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <Route path="/botTest" component={BotTest}/>
            <Route path="/designer" component={Designer}/>
            <Route path="/bot/:shortId" component={Main} />
        </Route>
    </Router>
);
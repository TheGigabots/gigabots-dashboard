import React from "react";
import {Router, Route, browserHistory} from "react-router";
import BotControls from "./BotControls";
import Main from "./Main";
import Designer from "./Designer";
import GamepadSetup from "./GamePadSetup";

export default  (
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <Route path="/controls" component={BotControls}/>
            <Route path="/designer" component={Designer}/>
            <Route path="/bot/:shortId" component={Main} />
            <Route path="/gamepad" component={GamepadSetup} />
        </Route>
    </Router>
);
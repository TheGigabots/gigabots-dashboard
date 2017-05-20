import Blockly from "./blockly";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import AppStore from "./store/AppStore";
import injectTapEventPlugin from "react-tap-event-plugin";
import routes from "./Routes";

global.Blockly = Blockly;

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(
    (<Provider store={AppStore.store}>
        {routes}
    </Provider>)
    , document.getElementById('app'));
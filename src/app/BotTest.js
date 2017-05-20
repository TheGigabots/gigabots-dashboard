import React from "react";
import {Card, CardText, CardMedia, CardTitle, RaisedButton} from "material-ui";
import GigabotPanel from "./GigabotPanel";

const styles = {
    width: '70%'
}

class BotTest extends React.Component {

    constructor() {
        super();

    }

    render() {
        return (
            <GigabotPanel/>
        );
    }
}
module.exports = BotTest;



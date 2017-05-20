"use strict";
import React from "react";
import Gigabot from "./Gigabot";
import {List, ListItem} from "material-ui/List";


export default class SensorDisplayPanel extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <List>
                {this.sensorToListItem("IN1", this.bot().IN1)}
                {this.sensorToListItem("IN2", this.bot().IN2)}
                {this.sensorToListItem("IN3", this.bot().IN3)}
                {this.sensorToListItem("IN4", this.bot().IN4)}
            </List>
        )
    }

    bot() {
        return new Gigabot(this.props.bot);
    }

    sensorToListItem( label, s ) {

        if(s == null) {
            return (<ListItem primaryText={`${label}: None`}/>)
        }


        if('lego-ev3-touch' === s.driverName) {
            return (<ListItem primaryText={`${label}: Touch Sensor`}/>)
        }
        else if ('lego-ev3-ir' == s.driverName ) {
            return (<ListItem primaryText={`${label}: IR Sensor`}/>)
        }
        else if ( 'lego-ev3-color' == s.driverName ) {
            return (<ListItem primaryText={`${label}: Color Sensor`}/>)
        }
        else if ( 'lego-ev3-us' == s.driverName ) {
            return (<ListItem primaryText={`${label}: Ultrasonic Sensor`}/>)
        }
        else {
            return (<ListItem primaryText={`${label}: None`}/>)
        }

    }
}

SensorDisplayPanel.propTypes = {
    bot: React.PropTypes.object,
};


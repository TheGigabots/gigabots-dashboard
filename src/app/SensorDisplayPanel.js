"use strict";
import React from "react";
import Gigabot from "./Gigabot";
import {Col, Row} from "react-flexbox-grid";
import {ListItem} from "material-ui/List";


export default class SensorDisplayPanel extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <Row>Firmware Version {this.bot().version}</Row>
                <Row>
                    <Col sm={6}> {this.sensorToListItem("IN1", this.bot().IN1)}</Col>
                    <Col sm={6}> {this.sensorToListItem("IN2", this.bot().IN2)}</Col>
                </Row>
                <Row>
                    <Col sm={6}> {this.sensorToListItem("IN3", this.bot().IN3)}</Col>
                    <Col sm={6}> {this.sensorToListItem("IN4", this.bot().IN3)}</Col>
                </Row>
            </div>
        )
    }

    bot() {
        return new Gigabot(this.props.bot);
    }

    sensorToListItem(label, s) {

        if (s == null) {
            return (<ListItem primaryText={`${label}: None`}/>)
        }


        if ('lego-ev3-touch' === s.driverName) {
            return (<ListItem primaryText={`${label}: Touch Sensor`}/>)
        }
        else if ('lego-ev3-ir' == s.driverName) {
            return (<ListItem primaryText={`${label}: IR Sensor`}/>)
        }
        else if ('lego-ev3-color' == s.driverName) {
            return (<ListItem primaryText={`${label}: Color Sensor`}/>)
        }
        else if ('lego-ev3-us' == s.driverName) {
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


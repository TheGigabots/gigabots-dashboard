"use strict";
import React from "react";
import AppStore from "./store/AppStore";
import MotorControlPanel from "./MotorControlPanel";
import SensorDisplayPanel from "./SensorDisplayPanel";
import {Row, Col} from "react-flexbox-grid";

class GigabotPanel extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = this.newState();
    }

    newState() {
        return {
            gigabot: AppStore.store.getState().gigabot
        }
    }

    componentDidMount() {
        this.unsubscribe = AppStore.store.subscribe(() => {
            this.setState(this.newState());
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getBotId() {

        let gigabot = null;

        if (this.state.gigabot && this.state.gigabot.gigabot) {
            gigabot = this.state.gigabot.gigabot;
        }


        if (gigabot && gigabot.ev3) {
            return gigabot.ev3.id;
        }
        else {
            return null;
        }
    }

    getVersion() {
        let gigabot = null;

        if (this.state.gigabot && this.state.gigabot.gigabot) {
            gigabot = this.state.gigabot.gigabot;
        }


        if (gigabot && gigabot.ev3) {
            return gigabot.ev3.version;
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <div>
                <Row>
                    Firmware Version {this.getVersion()}
                </Row>
                <Row>
                    <SensorDisplayPanel bot={this.state.gigabot} />
                </Row>
                <Row>
                    <Col sm={3}><MotorControlPanel botId={this.getBotId()} motor={"A"}/></Col>
                    <Col sm={3}><MotorControlPanel botId={this.getBotId()} motor={"B"}/></Col>
                </Row>
                <Row>
                    <Col sm={3}><MotorControlPanel botId={this.getBotId()} motor={"C"}/></Col>
                    <Col sm={3}><MotorControlPanel botId={this.getBotId()} motor={"D"}/></Col>
                </Row>
            </div>
        )
    }

}

module.exports = GigabotPanel;
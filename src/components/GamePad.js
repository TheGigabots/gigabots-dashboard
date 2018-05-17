import React from 'react';
import PropTypes from 'prop-types'
import AppStore from './../store/AppStore';
import Motors from "../blocks/Motors";

export default class GamePad extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.button = null;
    }

    generateEventsForButton(name) {
        const b = this.props.module.getButtons(name);

        if (b.justChanged) {
            this.onButton(name, b.pressed);
        }
    }

    onButton(name, pressed) {

        const {config, onButtonDown, onButtonUp} = this.props;
        const buttonConfig = config.buttons[name];

        if (buttonConfig) {
            if (buttonConfig.motor === "S") {
                if (pressed) {
                    AppStore.allStop(this.props.gigabot.id)
                }
            }
            else {
                if (pressed) {
                    this.onButtonDown(buttonConfig.motor, buttonConfig.direction, buttonConfig.speed);
                }
                else {
                    this.onButtonUp(buttonConfig.motor)
                }
            }
        }

        if (pressed) {
            this.button = name;

            if (onButtonDown) {
                onButtonDown(name);
            }
        }
        else {
            this.button = null;
            if (onButtonUp) {
                onButtonUp(name)
            }
        }
    }


    render() {

        this.generateEventsForButton("A");
        this.generateEventsForButton("B");
        this.generateEventsForButton("X");
        this.generateEventsForButton("Y");

        this.generateEventsForButton("dpadLeft");
        this.generateEventsForButton("dpadRight");
        this.generateEventsForButton("dpadUp");
        this.generateEventsForButton("dpadDown");
        this.generateEventsForButton("L1");
        this.generateEventsForButton("L2");
        this.generateEventsForButton("R1");
        this.generateEventsForButton("R2");

        return (
            <svg width={200} height={200} viewBox={"0 0 200 200"}>
                <text x="90" y="50" style={{font: "bold 60px"}}>{this.button}</text>
                <rect x={0} y={0} width="200" height="200" fill={"transparent"} stroke={"#000000"} rx="10" ry="10"/>

                <g id="leftShoulder" transform={"translate(25,50)"}>
                    {this.renderShoulderInput("L1", -5, -15)}
                    {this.renderShoulderInput("L2", -5, 5)}
                    <circle cx={0} cy={0} r={2} fill={"#000000"} stroke={"#000000"}></circle>
                </g>

                <g id="rightShoulder" transform={"translate(175,50)"}>
                    {this.renderShoulderInput("R1", -5, -15)}
                    {this.renderShoulderInput("R2", -5, 5)}
                    <circle cx={0} cy={0} r={2} fill={"#000000"} stroke={"#000000"}></circle>
                </g>

                <g transform={"translate(50,100)"}>
                    {this.renderDigital("dpadUp", 0, -20)}
                    {this.renderDigital("dpadDown", 0, 20)}
                    <circle cx={0} cy={0} r={5} fill={"#000000"} stroke={"#000000"}></circle>
                    {this.renderDigital("dpadLeft", -20, 0)}
                    {this.renderDigital("dpadRight", 20, 0)}
                </g>

                <g transform={"translate(150,100)"}>
                    {this.renderDigital("Y", 0, -20)}
                    {this.renderDigital("A", 0, 20)}
                    <circle cx={0} cy={0} r={5} fill={"#000000"} stroke={"#000000"}></circle>
                    {this.renderDigital("X", -20, 0)}
                    {this.renderDigital('B', 20, 0)}
                </g>
            </svg>
        )
    }


    renderDigital(input, x, y) {
        const {pressed} = this.props.module.getButtons(input);
        let fill = "transparent";

        if (pressed) {
            fill = "#000000"
        }
        return (
            <circle cx={x} cy={y} r={10} fill={fill} stroke={"#000000"}></circle>
        );
    }


    renderShoulderInput(input, x, y) {
        const {pressed} = this.props.module.getButtons(input);
        let fill = "transparent";

        if (pressed) {
            fill = "#000000"
        }
        return (
            <rect x={x} y={y} width="10" height="10" fill={fill} stroke={"#000000"} rx="2" ry="2"/>
        );
    }

    onButtonDown(motor, dir, speed) {
        AppStore.startMotor(this.props.gigabot.id, motor, dir, Motors.toRotationSpeed(speed, false));

    }

    onButtonUp(motor) {
        AppStore.stopMotor(this.props.gigabot.id, motor);
    }

}

GamePad.propTypes = {
    name: PropTypes.string,
    module: PropTypes.object,
    gigabot: PropTypes.object,
    config: PropTypes.object,
    onButtonDown: PropTypes.func,
    onButtonUp: PropTypes.func
}



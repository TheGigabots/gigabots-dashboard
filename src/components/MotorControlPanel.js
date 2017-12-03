import React from "react";
import {Button} from "material-ui";
import Gauge from "react-svg-gauge";
import AppStore from "./../store/AppStore";
import PropTypes from 'prop-types';


const style = {
    height: 200,
    width: 200,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

const minLabelStyle = {
    textAnchor: "middle",
    fill: "#999999",
    stroke: "none",
    fontStyle: "normal",
    fontVariant: "normal",
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontSize: 1,
    lineHeight: 'normal',
    fillOpacity: 1
}
//https://stackoverflow.com/questions/42771456/nipplejs-react-cannot-read-property-getboundingclientrect-of-undefined

export default class MotorControlPanel extends React.Component {
    static childContextTypes = {
        reflexbox: PropTypes.object
    }


    constructor(props, context) {
        super(props, context);
        this.state = {speed: 0}
    }

    getChildContext() {
        return {
            reflexbox: {
                debug: true
            }
        }
    }

    render() {
        return (
            <div>
                <b>{this.props.motor}</b>

                <Button raised onMouseDown={() => this.onButtonDown('f')}
                        onMouseUp={() => this.onButtonUp()}>FORWARD</Button>

                <Button raised onMouseDown={() => this.onButtonDown('r')}
                        onMouseUp={() => this.onButtonUp()}>REVERSE</Button>

                <Gauge value={this.state.speed} width={100} height={100} label="" min={0} max={1024}
                       minMaxLabelStyle={minLabelStyle}/>

                slider

            </div>
        )
    }

    /*
                        <Slider style={{width: 150}} value={this.state.speed}
                                min={0} max={1024} step={1.0}
                                onChange={(slider, val) => {
                                    this.onSlider(slider, val)
                                }}/>
     */

    onButtonDown(dir) {
        AppStore.startMotor(this.props.botId, this.props.motor, dir, this.state.speed);
    }

    onButtonUp() {
        AppStore.stopMotor(this.props.botId, this.props.motor);
    }

    onSlider(s, val) {
        let newVal = parseInt(val);
        this.setState({speed: newVal});
    }
}

MotorControlPanel.propTypes = {
    botId: PropTypes.string,
    motor: PropTypes.string
};

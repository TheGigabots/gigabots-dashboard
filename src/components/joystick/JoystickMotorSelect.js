import React from 'react';
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';

const style = {
    height: 75,
    width:  200,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};


export default class JoystickMotorSelect extends React.Component {

    handleMotorChange = event => {
        const {button, config} = this.props;
        const speed = config.speedForButton(button);
        const direction = config.directionForButton(button);
        this.updateParent(event.target.value, speed, direction);
    };

    handleSpeedChange(event) {
        const {button, config} = this.props;
        const direction = config.directionForButton(button);
        const motor = config.motorForButton(button);
        this.updateParent(motor, event.target.value, direction);
    }

    handleDirectionChange(event) {
        const {button, config} = this.props;
        const speed = config.speedForButton(button);
        const motor = config.motorForButton(button);
        this.updateParent(motor, speed, event.target.value);
    }

    updateParent(motor, speed, direction) {
        this.props.callback(this.props.button, motor, speed, direction)
    }

    render() {
        const {button, config} = this.props;
        const speed = config.speedForButton(button);
        const direction = config.directionForButton(button);
        const motor = config.motorForButton(button);

        return (
            <Paper style={style}>

                <Typography type="subheading" color="secondary">
                    {button}
                </Typography>
                <Select
                    value={motor}
                    onChange={this.handleMotorChange}
                >
                    <MenuItem value={""}>None</MenuItem>
                    <MenuItem value={"A"}>A</MenuItem>
                    <MenuItem value={"B"}>B</MenuItem>
                    <MenuItem value={"C"}>C</MenuItem>
                    <MenuItem value={"D"}>D</MenuItem>
                    <MenuItem value={"S"}>STOP</MenuItem>
                </Select>
                <Select
                    value={speed}
                    onChange={(e) => this.handleSpeedChange(e)}
                >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={60}>60</MenuItem>
                    <MenuItem value={70}>70</MenuItem>
                    <MenuItem value={80}>80</MenuItem>
                    <MenuItem value={90}>90</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
                <Select
                    value={direction}
                    onChange={(e) => this.handleDirectionChange(e)}
                >
                    <MenuItem value={"f"}>fwd</MenuItem>
                    <MenuItem value={"r"}>rvs</MenuItem>
                </Select>

            </Paper>
        )
    }
}


JoystickMotorSelect.propTypes = {
    button: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired
}


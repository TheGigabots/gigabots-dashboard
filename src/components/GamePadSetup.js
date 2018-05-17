import React from 'react';
import PropTypes from 'prop-types'
import Button from 'material-ui/Button';
import {createJoyMap, createQueryModule} from 'joymap';
import GamePad from './GamePad';
import {reactLocalStorage} from 'reactjs-localstorage';
import JoystickMotorSelect from './joystick/JoystickMotorSelect'
import JoystickConfig from './joystick/JoystickConfig';
import Grid from 'material-ui/Grid';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';


export default class GamePadSetup extends React.Component {
    constructor() {
        super();
        this.joyMap = createJoyMap();
        this.queryModule = createQueryModule();
        this.joyMap.addModule(this.queryModule);
        this.state = {joystickConfig: null, button: null}

    }

    componentWillMount() {
        let stored = reactLocalStorage.getObject('joystickConfig');
        let config = null;

        if (stored) {
            config = new JoystickConfig(stored);
        }
        else {
            config = new JoystickConfig({});
        }

        this.setState({joystickConfig: config})
        this.joyMap.setOnPoll(() => {
            this.forceUpdate()
        });
    }

    clearSetup() {
        reactLocalStorage.setObject("joystickConfig", null);
        this.setState({joystickConfig: new JoystickConfig({})});
    }


    componentDidMount = () => {
        this.joyMap.start();
    }

    componentWillUnmount = () => this.joyMap.stop();

    onJoystickSelectChange = (button, motor, speed, direction) => {
        const config = this.state.joystickConfig;

        config.setParam(button, "motor", motor);
        config.setParam(button, "speed", speed);
        config.setParam(button, "direction", direction);
        this.setState({joystickConfig: config}, () => {
            reactLocalStorage.setObject('joystickConfig', config.buttons);
        });
    }

    render() {
        const connected = this.queryModule.isConnected();
        const config = this.state.joystickConfig;
        const spacing = 8;
        const justify = 'center'
        const direction = "row";


        if (!connected) {
            return ""
        }


        return (
            <Card>
                <CardContent>
                    <Typography type="headline">Gamepad Setup</Typography>
                </CardContent>
                <CardContent>
                    <Grid container>
                        <Grid container spacing={spacing} justify={justify}>
                            <Grid item>
                                <JoystickMotorSelect button={"L1"} callback={this.onJoystickSelectChange}
                                                     config={config}/>
                            </Grid>
                            <Grid item>
                                <JoystickMotorSelect button={"L2"} callback={this.onJoystickSelectChange}
                                                     config={config}/></Grid>
                            <Grid item>
                                <JoystickMotorSelect button={"R1"} callback={this.onJoystickSelectChange}
                                                     config={config}/></Grid>

                            <Grid item>
                                <JoystickMotorSelect button={"R2"} callback={this.onJoystickSelectChange}
                                                     config={config}/></Grid>
                        </Grid>

                        <Grid container spacing={spacing} justify={justify}>
                            <Grid item>
                                <JoystickMotorSelect button={"dpadUp"} callback={this.onJoystickSelectChange}
                                                     config={config}/></Grid>

                            <Grid item>
                                <JoystickMotorSelect button={"dpadDown"} callback={this.onJoystickSelectChange}
                                                     config={config}/></Grid>

                            <Grid item>
                                <JoystickMotorSelect button={"dpadLeft"} callback={this.onJoystickSelectChange}
                                                     config={config}/></Grid>

                            <Grid item>
                                <JoystickMotorSelect button={"dpadRight"} callback={this.onJoystickSelectChange}
                                                     config={config}/></Grid>

                        </Grid>

                        <Grid container spacing={spacing} justify={justify}>
                            <Grid item>
                                <JoystickMotorSelect button={"X"} callback={this.onJoystickSelectChange}
                                                     config={config}/>
                            </Grid>
                            <Grid item>
                                <JoystickMotorSelect button={"A"} callback={this.onJoystickSelectChange}
                                                     config={config}/></Grid>
                            <Grid item>
                                <JoystickMotorSelect button={"Y"} callback={this.onJoystickSelectChange}
                                                     config={config}/></Grid>

                            <Grid item>
                                <JoystickMotorSelect button={"B"} callback={this.onJoystickSelectChange}
                                                     config={config}/></Grid>
                        </Grid>

                        <Grid container spacing={spacing} justify={justify}>
                            <Grid item>
                                <Typography>{this.state.button}</Typography>
                                <GamePad
                                    gigabot={this.props.gigabot}
                                    module={this.queryModule}
                                    config={config}
                                >
                                </GamePad>
                            </Grid>
                        </Grid>
                    </Grid>

                </CardContent>
                <CardActions>
                    <Button onClick={() =>this.clearSetup()}>CLEAR SETUP</Button>
                </CardActions>

            </Card>

        )
    }
}

GamePadSetup.propTypes = {
    gigabot: PropTypes.object
}



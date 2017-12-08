import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import {Button} from 'material-ui';
import nipplejs from 'nipplejs';
import AppStore from './../../store/AppStore';
import ArrowUp from 'material-ui-icons/KeyboardArrowUp';
import ArrowDown from 'material-ui-icons/KeyboardArrowDown';
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Motors from './../../blocks/Motors';


import Typography from 'material-ui/Typography';


const styles = theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 120,
        height: 120,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    nipple: {
        position: 'relative',
        height: 100,
        width: 100
    }
});

class MotorCard extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.nippleManager = null;
        this.state = {
            speed: 50
        }
    }


    componentDidMount() {

        /*
        const joystickParams = {
            zone: this.nippleJsDiv,
            mode: 'static',
            color: 'blue',
            position: {top: '50%', left: '50%'}
        };

        this.nippleManager = nipplejs.create(joystickParams);
        this.nippleManager.on('start end move', (evt, data) => {

            if (evt.type === 'move') {
                let percent = Math.ceil(data.distance * 2, 100);
                let rotationSpeed = Math.round((percent * 1024) / 100);
                AppStore.startMotor(this.props.gigabot.id, this.props.motor, 'forward', rotationSpeed);
            }

            if (evt.type === 'end') {
                AppStore.stopMotor(this.props.gigabot.id, this.props.motor);
            }
        })
        */
    }

    render() {
        const {classes, theme} = this.props;
        const motor = this.props.motor;
        return (
            <div>
                <Card className={classes.card}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography type="headline">{motor}</Typography>
                            <Typography type="subheading" color="secondary">
                                Motor
                            </Typography>
                            <Button
                                onMouseDown={() => this.onButtonDown('f')}
                                onMouseUp={() => this.onButtonUp()}
                                raised><ArrowUp/></Button>
                            <Button
                                onMouseDown={() => this.onButtonDown('r')}
                                onMouseUp={() => this.onButtonUp()}
                                raised><ArrowDown/></Button>
                            <Select
                                value={this.state.speed}
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
                        </CardContent>

                    </div>
                </Card>
            </div>
        );
    }


    /*
                            <div className={classes.controls}>
                            <div className={classes.nipple} ref={(div) => this.nippleJsDiv = div}>
                                <div className="front"></div>
                                <div className="back"></div>
                            </div>
                        </div>
     */


    handleSpeedChange(e) {
        this.setState({
            speed: e.target.value
        })
    }

    onButtonDown(dir) {
        console.log('cleek!');

        this.interval = setInterval(() => {
            AppStore.startMotor(this.props.gigabot.id, this.props.motor, dir, Motors.toRotationSpeed(this.state.speed, false));
        }, 250);

    }

    onButtonUp() {
        console.log('uncleek')
        clearInterval(this.interval);
        AppStore.stopMotor(this.props.gigabot.id, this.props.motor);
    }
}


MotorCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    gigabot: PropTypes.object.isRequired,
    motor: PropTypes.string.isRequired,
};

export default withStyles(styles, {withTheme: true})(MotorCard);
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import nipplejs from 'nipplejs';
import AppStore from './../../store/AppStore';


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
    }


    componentDidMount() {
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
    }

    render() {
        const {classes, theme} = this.props;
        const bot = this.props.gigabot;
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
                        </CardContent>
                        <div className={classes.controls}>
                            <div className={classes.nipple} ref={(div) => this.nippleJsDiv = div}>
                                <div className="front"></div>
                                <div className="back"></div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }


}


MotorCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    gigabot: PropTypes.object.isRequired,
    motor: PropTypes.string.isRequired,
};

export default withStyles(styles, {withTheme: true})(MotorCard);
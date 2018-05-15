import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import {Button} from 'material-ui';
import AppStore from './../../store/AppStore';
import ArrowUp from 'material-ui-icons/KeyboardArrowUp';
import ArrowDown from 'material-ui-icons/KeyboardArrowDown';
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Motors from './../../blocks/Motors';
import Grid from 'material-ui/Grid';


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
    }
});

class MotorCard extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            speed: 50
        }
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
                            <Grid container>
                                <Grid item>
                                    <Button
                                        color={"primary"}
                                        size={"small"}
                                        onMouseDown={() => this.onButtonDown('f')}
                                        onMouseUp={() => this.onButtonUp()}
                                         variant={"raised"}><ArrowUp/></Button>
                                </Grid>

                                <Grid item>
                                    <Button
                                        color={"primary"}
                                        size={"small"}
                                        onMouseDown={() => this.onButtonDown('r')}
                                        onMouseUp={() => this.onButtonUp()}
                                        variant={"raised"}><ArrowDown/></Button>

                                </Grid>

                                <Grid item>
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

                                </Grid>
                            </Grid>
                        </CardContent>

                    </div>
                </Card>
            </div>
        );
    }

    handleSpeedChange(e) {
        this.setState({
            speed: e.target.value
        })
    }

    onButtonDown(dir) {
        AppStore.startMotor(this.props.gigabot.id, this.props.motor, dir, Motors.toRotationSpeed(this.state.speed, false));
    }

    onButtonUp() {
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
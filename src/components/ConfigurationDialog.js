import React from "react";
import PropTypes from 'prop-types';
import {Button, Slide} from "material-ui";
import {reactLocalStorage} from 'reactjs-localstorage';
import SensorCard from './sensors/SensorCard'
import MotorCard from './sensors/MotorCard'
import Grid from 'material-ui/Grid';

import Dialog, {DialogActions, DialogContent, DialogTitle,} from 'material-ui/Dialog';


export default class ConfigurationDialog extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = this.newState();
    }

    newState() {

        let localBotId = reactLocalStorage.get('botId', "");
        return {
            botId: localBotId,
        }
    }

    render() {

        let bot = this.props.gigabot;

        return (
            <Dialog open={this.props.open} fullScreen={true}>
                <DialogTitle>Gigabot Configuration</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8}>
                        <Grid item xs={3}>
                            <MotorCard gigabot={bot} motor={"A"}/>
                        </Grid>
                        <Grid item xs={3}>
                            <MotorCard gigabot={bot} motor={"B"}/>
                        </Grid>
                        <Grid item xs={3}>
                            <MotorCard gigabot={bot} motor={"C"}/>
                        </Grid>
                        <Grid item xs={3}>
                            <MotorCard gigabot={bot} motor={"D"}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8}>
                        <Grid item xs={3}>
                            <SensorCard gigabot={bot} sensor="IN1"/>
                        </Grid>
                        <Grid item xs={3}>
                            <SensorCard gigabot={bot} sensor="IN2"/>
                        </Grid>
                        <Grid item xs={3}>
                            <SensorCard gigabot={bot} sensor="IN3"/>
                        </Grid>
                        <Grid item xs={3}>
                            <SensorCard gigabot={bot} sensor="IN4"/>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.cancelFunc(false)} color="primary">
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


ConfigurationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    gigabot: PropTypes.object.isRequired,
    cancelFunc: PropTypes.func.isRequired,
};


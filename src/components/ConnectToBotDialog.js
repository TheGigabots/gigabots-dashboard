import React from "react";
import PropTypes from 'prop-types';
import {Button, Card, CardActions, Icon, TextField} from "material-ui";
import Typography from 'material-ui/Typography';
import AppStore from "./../store/AppStore";
import Friends from "./Friends";
import S from "string";
import {reactLocalStorage} from 'reactjs-localstorage';

import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';


export default class ConnectToBotDialog extends React.Component {

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

        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Connect To Your Gigabot!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can find the 5 digit short code for your Gigabot on the display.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="botId"
                        label="Gigabot Short Code"
                        value={this.state.botId}
                        onChange={(e) => {
                            if (e) {
                                this.setState({botId: e.target.value.toUpperCase()})
                            }
                        }
                        }
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.cancelFunc} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{this.props.connectFunc(this.state.botId)}} color="primary">
                        Connect
                    </Button>
                </DialogActions>
            </Dialog>
        );

    }

    renderConnectPanel() {
        return (
            <Card>
                <TextField
                    helperText="BOT ID"
                    value={this.state.botId}
                    onChange={(e) => {
                        if (e) {
                            this.setState({botId: e.target.value.toUpperCase()})
                        }
                    }
                    }/>
                <CardActions>
                    <Button raised
                            onClick={() => {
                                this.connectToBot()
                            }}>
                        CONNECT
                    </Button>
                </CardActions>
            </Card>
        )
    }

    renderDisconnectPanel() {
        let botName = null;

        let gigabot = this.state.gigabot;

        if (gigabot && gigabot.gigabot && gigabot.gigabot.ev3) {
            botName = gigabot.gigabot.ev3.name;
        }


        let connected = false;

        if (gigabot && gigabot.device && gigabot.device.status) {
            connected = gigabot.device.status.connected;
        }


        let icon = connected ? 'wifi' : 'signal_wifi_off';
        let color = connected ? "primary" : "error";

        return (
            <div>
                <Card>
                    <Typography>
                        {botName} <Icon color={color}>{icon}</Icon>
                    </Typography>
                    <CardActions>
                        <Button raised
                                onClick={() => {
                                    this.disconnectFromBot()
                                }}>
                            DISCONNECT
                        </Button>
                    </CardActions>
                </Card>
                <Friends bot={this.state.gigabot}/>
            </div>
        )
    }


    connectToBot() {

        let botId = this.state.botId;

        if (S(botId).isEmpty()) {
            //TODO feedback.
        }
        else {
            AppStore.connectToBot(botId);
            AppStore.storeLocalBotId(botId);

        }
    }

    disconnectFromBot() {
        console.log(this.state.gigabot);

        let id = this.state.gigabot.gigabot.ev3.id;

        if (id) {
            console.log('Disconnecting from ->' + id);
            AppStore.disconnectFromBot(id);
            reactLocalStorage.set('botId', "");
        }
        else {

        }

    }
}

ConnectToBotDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    cancelFunc: PropTypes.func.isRequired,
    connectFunc: PropTypes.func.isRequired
};


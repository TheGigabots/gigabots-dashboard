import React from "react";
import {RaisedButton, Slide, Card, CardText, CardActions, TextField, FontIcon} from "material-ui";
import {red500, green500} from "material-ui/styles/colors";
import AppStore from "./store/AppStore";
import Friends from "./Friends";
import S from "string";
import {reactLocalStorage} from 'reactjs-localstorage';

export default class ConnectToBotPanel extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = this.newState();
    }

    newState() {


        let localBotId =  reactLocalStorage.get('botId', "");
        return {
            botId: localBotId,
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


    render() {

        const renderConnect = this.state.gigabot == null;

        if (renderConnect) {
            return this.renderConnectPanel()
        }
        else {
            return this.renderDisconnectPanel();
        }
    }

    renderConnectPanel() {
        return (
            <Card>
                <TextField
                    fullWidth={true}
                    hintText="ENTER YOUR BOT ID"
                    value={this.state.botId}
                    onChange={(e, t) => this.setState({botId: t.toUpperCase()})}/>
                <CardActions>
                    <RaisedButton label="CONNECT"
                                  fullWidth={true}
                                  onClick={ () => {
                                      this.connectToBot()
                                  }}/>
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
        let color = connected ? green500 : red500;

        return (
            <div>
                <Card>
                    <CardText>
                        {botName} <FontIcon className="material-icons" color={color}>{icon}</FontIcon>
                    </CardText>
                    <CardActions>
                        <RaisedButton label="DISCONNECT"
                                      fullWidth={true}
                                      onClick={ () => {
                                          this.disconnectFromBot()
                                      }}/>
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
            console.log('connecting to ' + botId)
            AppStore.connectToBot(botId);
            reactLocalStorage.set('botId', botId);

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


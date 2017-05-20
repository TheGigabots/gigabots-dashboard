"use strict";
import React from "react";
import {List, ListItem} from "material-ui/List";
import {IconButton, TextField, RaisedButton, Card, CardHeader} from "material-ui";
import {grey400} from "material-ui/styles/colors";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import Gigabot from "./Gigabot";
import AppStore from "./store/AppStore";
import _ from "lodash";

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="Remove robot friend"
        tooltipPosition="bottom-left"
    >
        <DeleteIcon color={grey400}/>
    </IconButton>
);


export default class Friends extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            botId: ""
        }
    }

    render() {
        return (
            <Card >
                <CardHeader>Friends</CardHeader>
                <List>
                    {this.friendsList()}
                </List>
                <TextField
                    fullWidth={true}
                    hintText="ENTER BOT ID"
                    value={this.state.botId}
                    onChange={(e, t) => this.setState({botId: t.toUpperCase()})}/>
                <RaisedButton label="ADD FRIEND"
                              fullWidth={true}
                              onClick={ () => {
                                  this.addFriend()
                              }}/>
            </Card>
        )
    }

    bot() {
        return new Gigabot(this.props.bot);
    }

    addFriend() {
        AppStore.addFriend(this.bot().id, this.state.botId);
    }

    friendsList() {
        let friends = Array.from(new Set(_.values(this.bot().friends)));

        return friends.map((f) => {
            return this.robotFriendListItem(f.shortCode);
        })
    }

    robotFriendListItem(code) {
        const iconButtonElement = (
            <IconButton
                touch={true}
                tooltip="Remove robot friend"
                tooltipPosition="bottom-left"
                onClick={() => {
                    AppStore.removeFriend(this.bot().id, code);
                }}
            >
                <DeleteIcon color={grey400}/>
            </IconButton>
        );

        return (
            <ListItem
                key={code}
                primaryText={code}
                rightIconButton={iconButtonElement}
            />
        )
    }
}
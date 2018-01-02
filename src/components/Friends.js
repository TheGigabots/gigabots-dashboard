import React from "react";
import PropTypes from 'prop-types';
import List, {ListItem, ListItemText} from 'material-ui/List';
import {Button, IconButton, TextField} from 'material-ui';
import DeleteIcon from "material-ui-icons/Delete";
import AppStore from "./../store/AppStore";
import _ from "lodash";
import Dialog, {DialogContent, DialogTitle} from 'material-ui/Dialog';

export default class Friends extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            botId: ""
        }
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closeFunc}
            >
                <DialogTitle>Friends</DialogTitle>
                <DialogContent>
                    <List>
                        {this.friendsList()}
                    </List>
                    <TextField
                        helperText="ENTER BOT ID"
                        value={this.state.botId}
                        onChange={(e) => this.setState({botId: e.target.value.toUpperCase()})}/>
                    <Button onClick={() => this.addFriend()}>ADD FRIEND</Button>
                </DialogContent>
            </Dialog>
        )
    }

    addFriend() {
        let bot = this.props.gigabot;
        AppStore.addFriend(bot.id, this.state.botId);
        this.setState({waiting:true, botId:""})
    }

    removeFriend(friend) {
        let bot = this.props.gigabot;
        AppStore.removeFriend(bot.id, friend)
        this.setState({waiting:true})
    }

    friendsList() {
        let bot = this.props.gigabot;
        let friends = Array.from(new Set(_.values(bot.friends)));

        return friends.map((f) => {
            return this.robotFriendListItem(f.shortCode);
        })
    }

    robotFriendListItem(code) {
        return (
            <ListItem
                key={code}>
                <ListItemText primary={code}/>
                <IconButton onClick={() => {
                    this.removeFriend(code)
                }}><DeleteIcon/></IconButton>
            </ListItem>
        )
    }
}

Friends.propTypes = {
    gigabot: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    closeFunc: PropTypes.func.isRequired
}
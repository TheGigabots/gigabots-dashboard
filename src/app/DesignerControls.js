"use strict";
import React from "react";
import {IconButton} from "material-ui";
import PlayCircleOutline from "material-ui/svg-icons/av/play-circle-outline";
import Stop from "material-ui/svg-icons/av/stop";
import CloudUpload from "material-ui/svg-icons/file/cloud-upload";
import {red500, green500} from "material-ui/styles/colors";
import AppStore from "./store/AppStore";


const styles = {
    smallIcon: {
        width: 36,
        height: 36,
    },
    mediumIcon: {
        width: 48,
        height: 48,
    },
    largeIcon: {
        width: 60,
        height: 60,
    },
    small: {
        width: 72,
        height: 72,
        padding: 16,
    },
    medium: {
        width: 96,
        height: 96,
        padding: 24,
    },
    large: {
        width: 120,
        height: 120,
        padding: 30,
    },
};


class DesignerControls extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (<div>
            <IconButton
                disabled={!this.props.connected}
                onClick={() => this.props.pushCallback()}
                iconStyle={styles.largeIcon}
                style={styles.large}
                tooltip={"Push code to Gigabot"}
                tooltipPosition={"top-center"}
            >
                <CloudUpload  />
            </IconButton>
            <IconButton
                disabled={!this.props.connected}
                iconStyle={styles.largeIcon}
                style={styles.large}
                tooltip={"Run Gigabot program"}
                tooltipPosition={"top-center"}
                onClick={() => AppStore.startScript(this.props.botId)}
            >
                <PlayCircleOutline color={green500}/>
            </IconButton>
            <IconButton
                disabled={!this.props.connected}
                iconStyle={styles.largeIcon}
                style={styles.large}
                tooltip={"Stop Gigabot program"}
                tooltipPosition={"top-center"}
                onClick={() => AppStore.stopScript(this.props.botId)}
            >
                <Stop color={red500}/>
            </IconButton>
        </div>)
    }
}


DesignerControls.propTypes = {
    botId: React.PropTypes.string,
    connected: React.PropTypes.bool,
    pushCallback: React.PropTypes.func
};

module.exports = DesignerControls;
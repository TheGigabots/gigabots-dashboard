import React from "react";
import PropTypes from 'prop-types';
import {Button} from "material-ui";
import {PlayCircleOutline, Stop, CloudUpload} from "material-ui-icons";
import {red, green} from "material-ui/colors";
import AppStore from "./../store/AppStore";

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

export default class DesignerControls extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (<div>
            <Button
                disabled={!this.props.connected}
                onClick={() => this.props.pushCallback()}

                style={styles.large}
                tooltip={"Push code to Gigabot"}

            >
                <CloudUpload  />
            </Button>
            <Button
                disabled={!this.props.connected}

                style={styles.large}
                tooltip={"Run Gigabot program"}

                onClick={() => AppStore.startScript(this.props.botId)}
            >
                <PlayCircleOutline color={green[500]}/>
            </Button>
            <Button
                disabled={!this.props.connected}
                style={styles.large}
                tooltip={"Stop Gigabot program"}
                onClick={() => AppStore.stopScript(this.props.botId)}
            >
                <Stop color={red[500]}/>
            </Button>
        </div>)
    }
}


DesignerControls.propTypes = {
    botId: PropTypes.string,
    connected: PropTypes.bool,
    pushCallback: PropTypes.func
};

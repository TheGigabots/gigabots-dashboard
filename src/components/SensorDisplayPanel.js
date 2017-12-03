import React from "react";
import List, {ListItem, ListItemText} from "material-ui/List";
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: 430,
        marginTop: theme.spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
    },
    drawerHeader: theme.mixins.toolbar,
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
});

class SensorDisplayPanel extends React.Component {

    render() {

        let bot = this.props.gigabot;

        return (
            <div className={styles.list}>
                <div tabIndex={0}
                     role="button">
                    <List>
                        <ListItem>
                            <ListItemText>Thing One</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText>Thing One</ListItemText>
                        </ListItem>
                    </List>
                </div>
            </div>
        )
    }

    sensorToListItem(label, s) {

        if (s == null) {
            return ( <ListItem><ListItemText>{`${label}: None`}</ListItemText></ListItem>)
        }

        if ('lego-ev3-touch' === s.driverName) {
            return (<ListItem><ListItemText>{`${label}: Touch Sensor`}</ListItemText></ListItem>)
        }
        else if ('lego-ev3-ir' == s.driverName) {
            return (<ListItem><ListItemText>{`${label}: IR Sensor`}</ListItemText></ListItem>)
        }
        else if ('lego-ev3-color' == s.driverName) {
            return (<ListItem><ListItemText>{`${label}: Color Sensor`}</ListItemText></ListItem> )
        }
        else if ('lego-ev3-us' == s.driverName) {
            return ( <ListItem><ListItemText>{`${label}: Ultrasonic Sensor`}</ListItemText></ListItem>)
        }
        else {
            return (  <ListItem><ListItemText>{`${label}: None`}</ListItemText></ListItem>)
        }

    }
}

SensorDisplayPanel.propTypes = {
    gigabot: PropTypes.object,
};

export default withStyles(styles)(SensorDisplayPanel)

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent, CardMedia} from 'material-ui/Card';
import {Palette} from "material-ui-icons";
import {blue, brown, green, grey, red, yellow} from 'material-ui/colors';


import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';


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
});

class SensorCard extends React.Component {

    render() {
        const {classes, theme} = this.props;
        const bot = this.props.gigabot;
        const sensor = bot[this.props.sensor];
        return (
            <div>
                <Card className={classes.card}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography type="headline">{this.props.sensor.substr(2)}</Typography>
                            <Typography type="subheading" color="secondary">
                                {this.metaForSensor(sensor).friendlyName}
                            </Typography>
                        </CardContent>
                        <div className={classes.controls}>
                            {this.renderSensorState()}
                        </div>
                    </div>
                    <CardMedia
                        className={classes.cover}
                        image={`/img/${this.metaForSensor().image}`}
                        title={this.metaForSensor().friendlyName}
                    />
                </Card>
            </div>
        );
    }

    renderSensorState() {
        const bot = this.props.gigabot;
        const sensor = bot[this.props.sensor];
        const driver = sensor.driverName;

        if (driver === 'lego-ev3-touch') {
            return this.renderTouchSensor();
        }
        else if (driver === 'lego-ev3-color') {
            return this.renderColorSensor();
        }
        else if (driver === 'lego-ev3-ir') {
            return this.renderIRSensor();
        }
        else {
            return (<div><Typography>unknown</Typography></div>);
        }

    }

    renderTouchSensor() {
        const bot = this.props.gigabot;
        const sensorVal = bot.sensorValue(this.props.sensor)
        let checked = sensorVal === 1 ? true : false

        return (
            <Checkbox
                checked={checked}
                value="checkedA"
            />
        )

    }

    renderIRSensor() {
        const bot = this.props.gigabot;
        const sensorVal = bot.sensorValue(this.props.sensor)

        return (
            <Typography>{sensorVal}</Typography>
        )
    }


    renderColorSensor() {
        const bot = this.props.gigabot;
        const sensorVal = bot.sensorValue(this.props.sensor)


        let fill = grey[50];
        let name = "none"

        if (sensorVal === 1) {
            fill = grey[900]
            name = "Black"
        }
        else if (sensorVal === 2) {
            fill = blue[500];
            name = "Blue"
        }
        else if (sensorVal === 3) {
            fill = green[500]
            name = "Green"
        }
        else if (sensorVal === 4) {
            fill = yellow[500]
            name = "Yellow"
        }
        else if (sensorVal === 5) {
            fill = red[500];
            name = "Red"
        }
        else if (sensorVal === 6) {
            fill = grey[50]
            name = "White"
        }
        else if (sensorVal === 7) {
            fill = brown[500];
            name = "Brown"
        }

        /*
        0	none
        1	black
        2	blue
        3	green
        4	yellow
        5	red
        6	white
        7	brown
        */
        return (
            <div>
                <Palette style={{fill: fill, width: 36, height: 36}}/>
                <Typography>{name}</Typography>
            </div>
        )
    }
    
    metaForSensor() {
        const bot = this.props.gigabot;
        const sensor = bot[this.props.sensor];
        let driver = sensor.driverName;

        let meta = {
            image: "",
            friendlyName: ""
        }

        if (driver === 'lego-ev3-touch') {
            meta.image = "touch-sensor-square.jpg";
            meta.friendlyName = "Touch Sensor";
        }
        else if (driver === 'lego-ev3-color') {
            meta.image = 'color-sensor-square.jpg'
            meta.friendlyName = 'Color Sensor';
        }
        else if (driver === 'lego-ev3-ir') {
            meta.image = 'infrared-sensor-square.jpg';
            meta.friendlyName = "IR Sensor";
        }

        return meta;
    }
}


SensorCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    gigabot: PropTypes.object.isRequired,
    sensor: PropTypes.string.isRequired,
};

export default withStyles(styles, {withTheme: true})(SensorCard);
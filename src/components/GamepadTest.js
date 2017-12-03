const React = require('react');
const ReactAnimationFrame = require('react-animation-frame');
const AppStore = require('./../store/AppStore');
const diffSteer = require('diff-steer');

class GamepadTest extends React.Component {

    //https://github.com/ensemblejs/gamepad-api-mappings
    //https://ericlathrop.github.io/html5-gamepad-configurator/
    constructor() {
        super();

        window.addEventListener("gamepadconnected", (e) => {
            console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                e.gamepad.index, e.gamepad.id,
                e.gamepad.buttons.length, e.gamepad.axes.length);
        });
        this.state = this.newState();

        this.steer = [0, 0];

    }

    newState() {
        return {
            gigabot: AppStore.store.getState().gigabot
        }
    }

    getBotId() {

        let gigabot = null;

        if (this.state.gigabot && this.state.gigabot.gigabot) {
            gigabot = this.state.gigabot.gigabot;
        }


        if (gigabot && gigabot.ev3) {
            return gigabot.ev3.id;
        }
        else {
            return null;
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


    onAnimationFrame(time) {
        this.updateGamepads();
        //
        //if (progress === 100) {
        //    this.props.endAnimation();
        // }
    }

    buttonPressed(b) {
        if (typeof(b) === "object") {
            return b.pressed;
        }
        return b === 1.0;
    }

    axisActivated(a) {

        return Math.abs(a) >= 0.1;
    }


    getGamepad() {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
        if (!gamepads) {
            return null;
        }
        return gamepads[0];
    }


    updateGamepads() {

        let gp = this.getGamepad();

        if (this.buttonPressed(gp.buttons[0])) {
            console.log("ZERO")
        } else if (this.buttonPressed(gp.buttons[2])) {
            console.log("TWO")
        }


        if (this.buttonPressed(gp.buttons[1])) {
            console.log("ONE")
        } else if (this.buttonPressed(gp.buttons[3])) {
            console.log("THREE")
        }


    }

    render() {

        let gamepad = this.getGamepad();


        let fwd = gamepad.axes[3];
        let turn = gamepad.axes[2];
        let steer = diffSteer(turn, fwd, 1, -1, 500, -1)

        steer[0] = Math.round(steer[0]);
        steer[1] = Math.round(steer[1]);

        let left = Math.round(steer[0]);
        let right = Math.round(steer[1]);

        let min = 25;


        if (Math.abs(this.steer[0] - left) > min || Math.abs(this.steer[1] - right) > min) {

            if (Math.abs(left) <= 50) {
                left = 0;
                steer[0] = 0;
            }

            if (Math.abs(right) <= 50) {
                right = 0;
                steer[1] = 0;
            }

            console.log(`left: ${left} right: ${right}`);
            AppStore.drive(this.getBotId(), left, right);
        }


        this.steer = steer;

        var items = this.getGamepad().buttons.map((button, i) => <li className={button.pressed ? "active" : ""}
                                                                     key={i}>{i}: {button.pressed ? "true" : "false"}</li>);
        return (
            <div>
                <ol>
                    {items}
                </ol>
                {this.renderAxes()}
                <div>
                    {steer}
                </div>
            </div>
        );
    }

    renderAxes() {
        var items = this.getGamepad().axes.map((axis, i) => <li className={Math.abs(axis) > 0.1 ? "active" : ""}
                                                                key={i}>{i}: {axis.toFixed(4)}</li>);
        return (
            <ol>
                {items}
            </ol>

        );
    }


}

module.exports = ReactAnimationFrame(GamepadTest);
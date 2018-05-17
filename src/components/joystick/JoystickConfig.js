export default class JoystickConfig {

    constructor(stored) {
        this.buttons = stored;
    }


    setParam(button, name, value) {

        let conf = this.buttons[button];

        if (!conf) {
            conf = {speed: 0, direction: "f", motor: ""};
        }

        conf[name] = value;
        this.buttons[button] = conf;
    }

    speedForButton(button) {
        let conf = this.buttons[button];

        if (conf) {
            return conf.speed;
        }
        else {
            return 50;
        }
    }

    motorForButton(button) {
        let conf = this.buttons[button];

        if (conf) {
            return conf.motor;
        }
        else {
            return "";
        }
    }

    directionForButton(button) {
        let conf = this.buttons[button];

        if (conf) {
            return conf.direction;
        }
        else {
            return "f";
        }
    }
}
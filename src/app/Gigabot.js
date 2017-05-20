export default class Gigabot {
    constructor(bot) {
        this._bot = bot;
    }

    get id() {
        if (this._bot && this._bot.gigabot && this._bot.gigabot.ev3) {
            return this._bot.gigabot.ev3.id;
        }
        else {
            return null;
        }
    }

    get friends() {
        if (this._bot && this._bot.friends) {
            return this._bot.friends;
        }
        else {
            return {};
        }
    }

    get version() {
        if(this._bot && this._bot.gigabot && this._bot.gigabot.ev3) {
            return this._bot.gigabot.ev3.version;
        }
        else {
            return null;
        }
    }


    get  IN1() {
        if (this._bot && this._bot.gigabot && this._bot.gigabot.ev3) {
            return this._bot.gigabot.ev3.sensors.IN1;
        }
        else {
            return null;
        }
    }

    get  IN2() {
        if (this._bot && this._bot.gigabot && this._bot.gigabot.ev3) {
            return this._bot.gigabot.ev3.sensors.IN2;
        }
        else {
            return null;
        }
    }

    get  IN3() {
        if (this._bot && this._bot.gigabot && this._bot.gigabot.ev3) {
            return this._bot.gigabot.ev3.sensors.IN3;
        }
        else {
            return null;
        }
    }

    get  IN4() {
        if (this._bot && this._bot.gigabot && this._bot.gigabot.ev3) {
            return this._bot.gigabot.ev3.sensors.IN4;
        }
        else {
            return null;
        }
    }
}
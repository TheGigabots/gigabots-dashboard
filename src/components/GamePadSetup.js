const React = require('react');
const GamepadTest = require('./GamepadTest');

class GamePadSetup extends React.Component {

    constructor() {
        super();
    }

    render() {

        return ( <GamepadTest durationMs={5000}/> );
    }
}

module.exports = GamePadSetup;
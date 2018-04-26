import React from 'react';
import PropTypes from 'prop-types'
import {createJoyMap, createQueryModule} from 'joymap';
import GamePad from './GamePad'


export default class GamePadSetup extends React.Component {
    constructor() {
        super();
        this.joyMap = createJoyMap();
        this.queryModule = createQueryModule();
        this.joyMap.addModule(this.queryModule);
    }

    componentWillMount() {
        this.joyMap.setOnPoll(() => this.forceUpdate());
    }

    componentDidMount = () => this.joyMap.start();
    componentWillUnmount = () => this.joyMap.stop();

    render() {

        return (
            <article>
                <section>
                    <GamePad
                        gigabot={this.props.gigabot}
                        module={this.queryModule}
                    >
                    </GamePad>
                </section>
            </article>
        )
    }
}

GamePadSetup.propTypes = {
    gigabot: PropTypes.object
}



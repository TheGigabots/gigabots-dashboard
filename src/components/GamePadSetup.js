import React from 'react';
import PropTypes from 'prop-types'
import {createJoyMap, createQueryModule} from 'joymap';
import GamePad from './GamePad'
import { Container, Draggable } from 'react-smooth-dnd';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';


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

        const connected = this.queryModule.isConnected();

        //No joystick, dont render component.
        if(!connected) {
            return "";
        }


        let items = [];

        return (

            <div>
                <Container groupName="1"   behaviour="copy" >
                    <Draggable key={'motor-key-thing'}>
                        <div className="draggable-item">
                            {<div>Motor Source</div>}
                        </div>
                    </Draggable>
                </Container>
                <Card>
                    <CardContent>
                        <Container roupName="1"  onDrop={this.props.onDrop}>
                            <Typography type="subheading" color="secondary">
                                L1
                            </Typography>
                            {items.map(item => {
                                return (
                                    <Draggable key={item.id}>
                                        {<div>{item.id}</div>}
                                    </Draggable>
                                );
                            })}
                        </Container>
                    </CardContent>
                </Card>

                <GamePad
                    gigabot={this.props.gigabot}
                    module={this.queryModule}
                >
                </GamePad>
            </div>

        )
    }
}

GamePadSetup.propTypes = {
    gigabot: PropTypes.object
}



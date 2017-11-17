import React from "react";
import CodeMirror from "react-codemirror";
import {Slide} from "material-ui";
import {BlocklyEditor} from "react-blockly-component";
import "codemirror/mode/javascript/javascript";
import ToolboxCategories from "./blocks/ToolboxCategories";
import AppStore from "./store/AppStore";
import DesignerControls from "./DesignerControls";
import {Col, Row} from "react-flexbox-grid";

///https://github.com/patientslikeme/react-blockly-component/issues/13
//https://github.com/BlocklyDuino/BlocklyDuino/tree/gh-pages/blockly
//https://github.com/code-dot-org/blockly
//http://ozoblockly.com/
//https://github.com/tarling/blockly-wedo
/*
 https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#8cpz6d
 */

var toolboxBlocks = [
    {type: "controls_if"},
    {type: "text"},
    {
        type: "text_print",
        values: {
            "TEXT": {
                type: "text",
                shadow: true,
                fields: {
                    "TEXT": "abc"
                }
            }
        }
    }
]


const style = {
    height: 600,
    width: 800
}

export default class Designer extends React.Component {
    constructor() {
        super();
        this.state = this.newState();
        this.blocklyEditor = null;
    }

    newState() {
        return {
            xml: null,
            gigabot: AppStore.store.getState().gigabot
        }
    }

    componentWillMount() {
        this.loadCustomBlocks();
    }

    componentDidMount() {
        this.getBlocklyWorkspace().addChangeListener(() => {
            this.generateCode();
        })
        this.unsubscribe = AppStore.store.subscribe(() => {
            this.setState(this.newState());
        })

    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    /**
     * Don't try and require these blocks up top before blockly is properly initialized.
     */
    loadCustomBlocks() {

        require('./blocks/StartEventBlock')
        require('./blocks/RunEventBlock')

        require('./blocks/SayBlock')
        require('./blocks/BeepBlock')

        //Sensors
        require('./blocks/BatteryVoltageBlock');
        require('./blocks/TouchSensorBlock')
        require('./blocks/InfraredSensorBlock');
        require('./blocks/ColorSensorBlock');
        require('./blocks/UltrasonicSensorBlock');


        require('./blocks/TimeInMillisBlock');

        require('./blocks/LogBlock')
        require("./blocks/WaitBlock")
        require('./blocks/EveryBlock')

        require('./blocks/LEDBlock')
        require('./blocks/RunMotorForTime')
        require('./blocks/DriveSetupBlock');
        require('./blocks/MotorOutputBlock');
        require('./blocks/DriveControlBlock');

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

    getBotConnected() {

        if (this.state.gigabot && this.state.gigabot.device && this.state.gigabot.device.status) {
            return this.state.gigabot.device.status.connected;
        }
        else {
            return false;
        }
    }


    render() {
        const workspaceConfiguration = {
            grid: {
                spacing: 20,
                length: 3,
                colour: '#ccc',
                snap: true
            }
        };

        const codeMirrorOptions = {
            lineNumbers: true,
            mode: 'javascript',
            readOnly: true
        };

        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <DesignerControls
                            botId={this.getBotId()}
                            connected={this.getBotConnected()}
                            pushCallback={() => this.doPublish()}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <div id="blokz" style={style}>
                            <BlocklyEditor name="The Gigabots Editor" toolboxCategories={ToolboxCategories}
                                           toolboxBlocks={toolboxBlocks}
                                           workspaceConfiguration={workspaceConfiguration}
                                           xmlDidChange={(xml) => this.onXmlDidChange(xml)}
                                           wrapperDivClassName="blockly-fill-height"
                                           ref={(editor) => this.blocklyEditor = editor}/>
                        </div>
                    </Col>

                </Row>
                <Row>
                    <Col xs={12}>
                        <CodeMirror value={this.state.code} options={codeMirrorOptions}/>
                    </Col>
                </Row>
            </div>

        );
    }


    doPublish() {
        let id = this.getBotId();
        AppStore.publishScript(id, this.state.code);
    }

    onXmlDidChange(xml) {
        this.setState({xml: xml});
    }

    generateCode() {
        if (this.state.xml != null) {
            let code = Blockly.JavaScript.workspaceToCode(this.getBlocklyWorkspace());
            this.setState({code: code})
        }
    }

    getBlocklyWorkspace() {
        return this.blocklyEditor.refs.workspace.state.workspace;
    }
}
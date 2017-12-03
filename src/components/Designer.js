import React from "react";
import PropTypes from "prop-types";
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import {Controlled as CodeMirror} from 'react-codemirror2'
import Blockly from 'node-blockly/browser';
import GigabotsToolbox from './../blocks/GigabotsToolbox';
import {reactLocalStorage} from 'reactjs-localstorage';

const editorStyle = {
    height: '99vh'
}

//https://groups.google.com/forum/#!topic/blockly/w4LUJuY3xJo
export default class Designer extends React.Component {
    constructor() {
        super();
        this.state = this.newState();
        this.blocklyEditor = null;
    }

    newState() {
        return {
            code: ""
        }
    }

    componentWillMount() {
        this.loadCustomBlocks();
    }

    componentDidMount() {
        this.blocklyEditor = Blockly.inject(this.blocklyDiv,
            {
                toolbox: GigabotsToolbox,
                maxBlocks: Infinity,
                trashcan: true,
                grid: {
                    spacing: 20,
                    length: 1,
                    colour: '#888',
                    snap: true
                },
                zoom: {
                    controls: true,
                    wheel: false,
                    startScale: 1.1,
                    maxScale: 3,
                    minScale: 0.3,
                    scaleSpeed: 1.2
                }
            }
        );

        let loadedXML = reactLocalStorage.get("editorXML");

        if (loadedXML) {
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(loadedXML), this.blocklyEditor);
        }


        this.blocklyEditor.addChangeListener(() => {
            let code = Blockly.JavaScript.workspaceToCode(this.blocklyEditor);
            this.props.codeUpdate(code);

            var xml = Blockly.Xml.workspaceToDom(this.blocklyEditor);
            var xml_text = Blockly.Xml.domToText(xml);
            reactLocalStorage.set("editorXML", xml_text);
            this.setState({code: code})

        })
        window.addEventListener('resize', () => this.resize())
    }


    componentWillUnmount() {
        this.unsubscribe();
    }

    friendOptions() {
        if (this.props.gigabot) {
            const friendsList = this.props.gigabot.friendsAsList();
            let list = friendsList.map(f => {
                return [f.shortCode, f.shortCode];
            })

            list.push(['bot', 'bot'])
            return list;
        }
        else {
            return [["bot", "bot"]];
        }
    }

    validateFriendOptions(e) {
        //console.log(e);
    }


    /**
     * Don't try and require these blocks up top before blockly is properly initialized.
     */
    loadCustomBlocks() {
        require('./../blocks/StartEventBlock');
        require('./../blocks/RunEventBlock');

        require('./../blocks/FriendInput').init(() => {
            return this.friendOptions();
        }, (e) => {
            return this.validateFriendOptions(e);
        })

        require('./../blocks/SayBlock');
        require('./../blocks/BeepBlock');

        //Sensors
        require('./../blocks/BatteryVoltageBlock');
        require('./../blocks/TouchSensorBlock');
        require('./../blocks/InfraredSensorBlock');
        require('./../blocks/ColorSensorBlock');
        require('./../blocks/UltrasonicSensorBlock');


        require('./../blocks/TimeInMillisBlock');

        require('./../blocks/LogBlock');
        require("./../blocks/WaitBlock");
        require('./../blocks/EveryBlock');

        require('./../blocks/LEDBlock');
        require('./../blocks/RunMotorForTime');
        require('./../blocks/DriveSetupBlock');
        require('./../blocks/MotorOutputBlock');
        require('./../blocks/DriveControlBlock');

    }

    resize() {
        this.blocklyDiv.style.width = this.blocklyDiv.parentNode.clientWidth - 10;
        this.blocklyDiv.style.height = this.blocklyDiv.parentNode.clientHeight - 10;
        Blockly.svgResize(this.blocklyEditor);
        this.forceUpdate()
    }

    render() {
        let blocklyDivStyle = {
            height: 800,
            width: 1000
        }

        if (this.blocklyDiv) {
            let calcWidth = this.blocklyDiv.parentNode.clientWidth;
            let calcHeight = this.blocklyDiv.parentNode.clientHeight;
            blocklyDivStyle.width = calcWidth;
            blocklyDivStyle.height = calcHeight;
            //TODO Height...
            //console.log(`w:${calcWidth} h:${calcHeight}`);
        }

        return (
            <div>
                <div id="blocklyContainer" className={editorStyle}>
                    <div id="blocklyDiv" style={blocklyDivStyle} ref={(d) => {
                        this.blocklyDiv = d
                    }}></div>
                </div>
            </div>
        );
    }
}

/*
<CodeMirror value={this.state.code} options={{
    mode: 'javascript',
    theme: 'material',
    readOnly: true
}}/>
*/


Designer.propTypes = {
    codeUpdate: PropTypes.func.isRequired,
    gigabot: PropTypes.object.isRequired
};




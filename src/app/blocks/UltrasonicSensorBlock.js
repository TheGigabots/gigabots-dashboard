"use strict";
const S = require('string');

Blockly.Blocks['ultrasonic_sensor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Ultrasonic Sensor");
        this.appendDummyInput()
            .appendField("shortCode");
        this.appendValueInput("shortCode")
            .setCheck("String");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(30);
        this.setTooltip('Fill in bot short code for remote bot');
        this.setHelpUrl('');
    }
};


Blockly.JavaScript['ultrasonic_sensor'] = function (block) {
    var value_shortcode = Blockly.JavaScript.valueToCode(block, 'shortCode', Blockly.JavaScript.ORDER_ATOMIC);


    if (S(value_shortcode).isEmpty() || value_shortcode === "''" || value_shortcode === "'bot'") {
        value_shortcode = "bot";
    }
    else {
        //There is probably a better way to retrieve this..
        value_shortcode = S(value_shortcode).strip("'").s.toUpperCase();
    }

    var code = `${value_shortcode}.sensors.ultrasonicSensor()`;


    return [code, Blockly.JavaScript.ORDER_NONE];
};


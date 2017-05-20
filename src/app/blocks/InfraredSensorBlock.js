"use strict";
const S = require('string');


Blockly.Blocks['ir_sensor'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Infrared Sensor");
        this.appendDummyInput()
            .appendField("shortCode");
        this.appendValueInput("shortCode")
            .setCheck("String");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(30);
        this.setTooltip('Fill in bot short code for remote bot');
        this.setHelpUrl('');
    }
};


Blockly.JavaScript['ir_sensor'] = function(block) {
    var value_shortcode = Blockly.JavaScript.valueToCode(block, 'shortCode', Blockly.JavaScript.ORDER_ATOMIC);


    if (S(value_shortcode).isEmpty() || value_shortcode === "''" || value_shortcode === "'bot'") {
        value_shortcode = "bot";
    }
    else {
        //There is probably a better way to retrieve this..
        value_shortcode = S(value_shortcode).strip("'").s.toUpperCase();
    }

    var code = `${value_shortcode}.sensors.irSensor()`;


    return [code, Blockly.JavaScript.ORDER_NONE];
};
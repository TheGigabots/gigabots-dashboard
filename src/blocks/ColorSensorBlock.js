
import Blockly from 'node-blockly/browser';
import S from 'string';

/*
Blockly.Blocks['color_sensor'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Color Sensor");
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
*/


Blockly.JavaScript['color_sensor'] = function(block) {
    var value_shortcode = Blockly.JavaScript.valueToCode(block, 'shortCode', Blockly.JavaScript.ORDER_ATOMIC);

    if (S(value_shortcode).isEmpty() || value_shortcode === "''" || value_shortcode === "'bot'") {
        value_shortcode = "bot";
    }

    var code = `${value_shortcode}.sensors.colorSensor()`;


    return [code, Blockly.JavaScript.ORDER_NONE];
};


import Blockly from 'node-blockly/browser';
import S from 'string';

/*
Blockly.Blocks['touch_sensor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Touch Sensor");
        this.appendDummyInput()
            .appendField("shortCode");
        this.appendValueInput("shortCode")
            .setCheck("friend_input");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(30);
        this.setTooltip('Fill in bot short code for remote bot');
        this.setHelpUrl('');
    }
};
*/
Blockly.JavaScript['touch_sensor'] = function (block) {
    var value_shortcode = Blockly.JavaScript.valueToCode(block, 'shortCode', Blockly.JavaScript.ORDER_NONE);

    if (S(value_shortcode).isEmpty() || value_shortcode === "''" || value_shortcode === "'bot'") {
        value_shortcode = "bot";
    }

    var code = `${value_shortcode}.sensors.touchSensor()`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};
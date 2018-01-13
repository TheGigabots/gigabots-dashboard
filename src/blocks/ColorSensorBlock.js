
import Blockly from 'node-blockly/browser';
import S from 'string';


Blockly.JavaScript['color_sensor'] = function(block) {
    var value_shortcode = Blockly.JavaScript.valueToCode(block, 'shortCode', Blockly.JavaScript.ORDER_ATOMIC);

    if (S(value_shortcode).isEmpty() || value_shortcode === "''" || value_shortcode === "'bot'") {
        value_shortcode = "bot";
    }

    var code = `${value_shortcode}.sensors.colorSensor()`;


    return [code, Blockly.JavaScript.ORDER_NONE];
};


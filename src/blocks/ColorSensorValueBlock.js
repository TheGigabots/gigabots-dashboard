import Blockly from 'node-blockly/browser';

Blockly.JavaScript['color_sensor_value'] = function(block) {

    var dropdown_color = block.getFieldValue('COLOR');
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_color;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};
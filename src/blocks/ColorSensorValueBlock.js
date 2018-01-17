import Blockly from 'node-blockly/browser';

Blockly.JavaScript['color_sensor_value'] = function (block) {
    var dropdown_color = block.getFieldValue('COLOR');
    var code = dropdown_color;
    return [parseInt(code), Blockly.JavaScript.ORDER_NONE];
};
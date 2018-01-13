import Blockly from 'node-blockly/browser';

Blockly.JavaScript['led'] = function(block) {
    var dropdown_pos_dropdown = block.getFieldValue('POS_DROPDOWN');
    var dropdown_color_dropdown = block.getFieldValue('COLOR_DROPDOWN');
    return `bot.leds.${dropdown_pos_dropdown}.setColor( '${dropdown_color_dropdown}' );\n`;
};
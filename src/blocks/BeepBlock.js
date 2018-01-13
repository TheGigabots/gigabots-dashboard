import Blockly from 'node-blockly/browser';

Blockly.JavaScript['beep'] = function(block) {
    var number_frequency = block.getFieldValue('FREQUENCY');
    var number_duration = Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ATOMIC);
    return `bot.beep( ${number_frequency}, ${number_duration});\n`;
};
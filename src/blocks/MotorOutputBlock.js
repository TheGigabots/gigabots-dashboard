import Blockly from 'node-blockly/browser';

Blockly.JavaScript['motor_output'] = function(block) {
    var dropdown_motor = block.getFieldValue('MOTOR');
    var checkbox_reverse = block.getFieldValue('REVERSE') === 'TRUE';
    // TODO: Assemble JavaScript into code variable.
    var code = `{motor: '${dropdown_motor}', reverse: ${checkbox_reverse} }`
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};
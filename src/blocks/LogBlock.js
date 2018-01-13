
import Blockly from 'node-blockly/browser';

Blockly.JavaScript['log'] = function (block) {
    var value_printable = Blockly.JavaScript.valueToCode(block, 'PRINTABLE', Blockly.JavaScript.ORDER_ATOMIC);
    return `bot.log( ${value_printable} );\n`
};

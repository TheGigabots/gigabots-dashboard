import Blockly from 'node-blockly/browser';

Blockly.JavaScript['wait'] = function (block) {
    var value_runtime = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
    return `await bot.wait(${value_runtime});\n`;
};
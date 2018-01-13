import Blockly from 'node-blockly/browser';

Blockly.JavaScript['stop_all_motor'] = function (block) {
    return(`bot.motors.allStop();\n`)
};
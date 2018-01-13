import Blockly from 'node-blockly/browser';

Blockly.JavaScript['stop_motor'] = function (block) {
    var motor = Blockly.JavaScript.valueToCode(block, 'MOTOR', Blockly.JavaScript.ORDER_ATOMIC);
    let actualMotor = eval(motor);
    return(`bot.motors.${actualMotor.motor}.stop();\n`)
};
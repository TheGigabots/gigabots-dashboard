import Blockly from 'node-blockly/browser';
import Motors from './Motors'


Blockly.JavaScript['run_motor_speed'] = function (block) {

    var motor = Blockly.JavaScript.valueToCode(block, 'MOTOR', Blockly.JavaScript.ORDER_ATOMIC);
    let actualMotor = eval(motor);
    var percentSpeed = block.getFieldValue('SPEED');
    const func = [];
    func.push(`bot.motors.${actualMotor.motor}.start(${Motors.toRotationSpeed(percentSpeed, actualMotor.reverse)});\n`)
    return func.join('\n');
};
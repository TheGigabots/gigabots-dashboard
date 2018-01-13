import Blockly from 'node-blockly/browser';
import Motors from './Motors'

Blockly.JavaScript['run_motor_time'] = function(block) {

    var motor = Blockly.JavaScript.valueToCode(block, 'MOTOR', Blockly.JavaScript.ORDER_ATOMIC);
    let actualMotor = eval(motor);
    var percentSpeed = block.getFieldValue('SPEED');

    var value_runtime = Blockly.JavaScript.valueToCode(block, 'RUNTIME', Blockly.JavaScript.ORDER_ATOMIC);
    return `await bot.motors.${actualMotor.motor}.runForTime( ${value_runtime}, ${Motors.toRotationSpeed(percentSpeed, actualMotor.reverse)});\n`;
};
import Blockly from 'node-blockly/browser';
import Motors from './Motors'

Blockly.JavaScript['drive_control_time'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var number_speed = block.getFieldValue('SPEED');

    //Convert from percent to rotation speed
    var rotationSpeed = Motors.toRotationSpeed(number_speed, false);


    var value_runtime = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);


    let code = [];
    code.push(`bot.drive.${dropdown_name}( ${rotationSpeed} );`);
    code.push(`await bot.wait(${value_runtime});`);
    code.push(`bot.drive.stop();`);
    code.push('\n');
    return code.join('\n');
};
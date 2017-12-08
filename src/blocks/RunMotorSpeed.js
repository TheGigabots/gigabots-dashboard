import Blockly from 'node-blockly/browser';
import Motors from './Motors'


Blockly.Blocks['run_motor_speed'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Run motor");
        this.appendValueInput("MOTOR")
            .setCheck("motor_output");
        this.appendDummyInput()
            .appendField("Speed")
            .appendField(new Blockly.FieldNumber(0, -100, 100), "SPEED");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};


Blockly.JavaScript['run_motor_speed'] = function (block) {

    var motor = Blockly.JavaScript.valueToCode(block, 'MOTOR', Blockly.JavaScript.ORDER_ATOMIC);
    let actualMotor = eval(motor);
    var percentSpeed = block.getFieldValue('SPEED');
    const func = [];
    func.push(`bot.motors.${actualMotor.motor}.start(${Motors.toRotationSpeed(percentSpeed, actualMotor.reverse)});\n`)
    return func.join('\n');
};
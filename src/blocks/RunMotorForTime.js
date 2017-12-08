import Blockly from 'node-blockly/browser';
import Motors from './Motors'

Blockly.Blocks['run_motor_time'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Run motor");
        this.appendValueInput("MOTOR")
            .setCheck("motor_output");
        this.appendDummyInput()
            .appendField("Speed")
            .appendField(new Blockly.FieldNumber(0, -100, 100), "SPEED");
        this.appendDummyInput()
            .appendField("Time");
        this.appendValueInput("RUNTIME")
            .setCheck("time_in_millis");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['run_motor_time'] = function(block) {

    var motor = Blockly.JavaScript.valueToCode(block, 'MOTOR', Blockly.JavaScript.ORDER_ATOMIC);
    let actualMotor = eval(motor);
    var percentSpeed = block.getFieldValue('SPEED');

    var value_runtime = Blockly.JavaScript.valueToCode(block, 'RUNTIME', Blockly.JavaScript.ORDER_ATOMIC);
    return `bot.motors.${actualMotor.motor}.runForTime( ${value_runtime}, ${Motors.toRotationSpeed(percentSpeed, actualMotor.reverse)});\n`;
};
import Blockly from 'node-blockly/browser';

/*
Blockly.Blocks['stop_motor'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Stop motor");
        this.appendValueInput("MOTOR")
            .setCheck("motor_output");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
*/


Blockly.JavaScript['stop_motor'] = function (block) {
    var motor = Blockly.JavaScript.valueToCode(block, 'MOTOR', Blockly.JavaScript.ORDER_ATOMIC);
    let actualMotor = eval(motor);
    return(`bot.motors.${actualMotor.motor}.stop();\n`)
};
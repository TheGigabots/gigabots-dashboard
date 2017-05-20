"use strict";

Blockly.Blocks['run_motor_time'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Run motor")
            .appendField(new Blockly.FieldDropdown([["a","a"], ["b","b"], ["c","c"], ["d","d"]]), "MOTOR")
            .appendField("for");
        this.appendValueInput("RUNTIME")
            .setCheck("time_in_millis");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.JavaScript['run_motor_time'] = function(block) {
    var dropdown_motor = block.getFieldValue('MOTOR');
    var value_runtime = Blockly.JavaScript.valueToCode(block, 'RUNTIME', Blockly.JavaScript.ORDER_ATOMIC);
    return `bot.motors.${dropdown_motor}.runForTime( ${value_runtime}, 500);\n`;
};
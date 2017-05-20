Blockly.Blocks['motor_output'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Motor")
            .appendField(new Blockly.FieldDropdown([["A","A"], ["B","B"], ["C","C"], ["D","D"]]), "MOTOR")
            .appendField("Reverse")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "REVERSE");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['motor_output'] = function(block) {
    var dropdown_motor = block.getFieldValue('MOTOR');
    var checkbox_reverse = block.getFieldValue('REVERSE') == 'TRUE';
    // TODO: Assemble JavaScript into code variable.
    var code = `{motor: '${dropdown_motor}', reverse: ${checkbox_reverse} }`
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};
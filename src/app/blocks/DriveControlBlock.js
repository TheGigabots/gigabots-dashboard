Blockly.Blocks['drive_control'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Drive Control");
        this.appendDummyInput()
            .appendField("Command")
            .appendField(new Blockly.FieldDropdown([["forward","forward"], ["backward","backward"], ["left","left"], ["right","right"], ["stop","stop"]]), "NAME");
        this.appendDummyInput()
            .appendField("Speed")
            .appendField(new Blockly.FieldNumber(0, 0, 1024, 1), "SPEED");
        this.setPreviousStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['drive_control'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var number_speed = block.getFieldValue('SPEED');
    // TODO: Assemble JavaScript into code variable.
    var code = `bot.drive.${dropdown_name}( ${number_speed} );\n`
    return code;
};
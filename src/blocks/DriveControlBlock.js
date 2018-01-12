import Blockly from 'node-blockly/browser';

/*
Blockly.Blocks['drive_control'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Drive Control");
        this.appendDummyInput()
            .appendField("Command")
            .appendField(new Blockly.FieldDropdown([["forward","forward"], ["backward","backward"], ["left","left"], ["right","right"], ["stop","stop"]]), "NAME");
        this.appendDummyInput()
            .appendField("Speed")
            .appendField(new Blockly.FieldNumber(50, 0, 100, 1), "SPEED")
            .appendField("%");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
*/


Blockly.JavaScript['drive_control'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var number_speed = block.getFieldValue('SPEED');

    //Convert from percent to rotation speed
    var rotationSpeed = Math.round((number_speed * 1024) / 100);

    // TODO: Assemble JavaScript into code variable.
    var code = `bot.drive.${dropdown_name}( ${rotationSpeed} );\n`
    return code;
};
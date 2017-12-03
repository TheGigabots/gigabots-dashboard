import Blockly from 'node-blockly/browser';

Blockly.Blocks['led'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("LED");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["left","left"], ["right","right"]]), "POS_DROPDOWN");
        this.appendDummyInput()
            .appendField("Color");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["red","red"], ["green","green"], ["off","off"]]), "COLOR_DROPDOWN");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.JavaScript['led'] = function(block) {
    var dropdown_pos_dropdown = block.getFieldValue('POS_DROPDOWN');
    var dropdown_color_dropdown = block.getFieldValue('COLOR_DROPDOWN');
    // TODO: Assemble JavaScript into code variable.
    return `bot.leds.${dropdown_pos_dropdown}.setColor( '${dropdown_color_dropdown}' );\n`;
};
import Blockly from 'node-blockly/browser';

/*
Blockly.Blocks['color_sensor_value'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Color Sensor Value");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["BLACK","1"], ["BLUE","2"], ["GREEN","3"], ["YELLOW","4"], ["RED","5"], ["WHITE","6"], ["BROWN","7"]]), "COLOR");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
*/


Blockly.JavaScript['color_sensor_value'] = function(block) {

    var dropdown_color = block.getFieldValue('COLOR');
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_color;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};
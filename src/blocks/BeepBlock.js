import Blockly from 'node-blockly/browser';

/*
Blockly.Blocks['beep'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("beep")
            .appendField("frequency")
            .appendField(new Blockly.FieldNumber(0, 20, 10000), "FREQUENCY")
            .appendField("Time");
        this.appendValueInput("DURATION")
            .setCheck("time_in_millis");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
*/


Blockly.JavaScript['beep'] = function(block) {
    var number_frequency = block.getFieldValue('FREQUENCY');
    var number_duration = Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ATOMIC);
    return `bot.beep( ${number_frequency}, ${number_duration});\n`;
};
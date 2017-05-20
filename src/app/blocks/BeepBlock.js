Blockly.Blocks['beep'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("beep")
            .appendField("freq")
            .appendField(new Blockly.FieldNumber(0, 20, 10000), "FREQUENCY")
            .appendField("duration")
            .appendField(new Blockly.FieldNumber(0, 1, 5000), "DURATION");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.JavaScript['beep'] = function(block) {
    var number_frequency = block.getFieldValue('FREQUENCY');
    var number_duration = block.getFieldValue('DURATION');
    return `bot.beep( ${number_frequency}, ${number_duration}) ;\n`;
};
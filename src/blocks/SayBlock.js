import Blockly from 'node-blockly/browser';

Blockly.Blocks['say'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Say")
            .appendField("Speed")
            .appendField(new Blockly.FieldNumber(175, 80, 460), "SPEED")
            .appendField("Pitch")
            .appendField(new Blockly.FieldNumber(50, 1, 99), "PITCH")
            .appendField("Formant")
            .appendField(new Blockly.FieldNumber(0, 0, 4), "FORMANT");
        this.appendValueInput("textToSay")
            .setCheck(["String", "Number"]);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.JavaScript['say'] = function (block) {
    var value_texttosay = Blockly.JavaScript.valueToCode(block, 'textToSay');
    var number_formant = block.getFieldValue('FORMANT');
    var number_speed = block.getFieldValue('SPEED');
    var number_pitch = block.getFieldValue('PITCH');
    return `bot.speech.say(${value_texttosay}, ${number_speed}, ${number_pitch} ,${number_formant} );\n`
};

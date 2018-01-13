import Blockly from 'node-blockly/browser';

/*
Blockly.Blocks['wait'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("wait");
        this.appendDummyInput()
            .appendField("Time");
        this.appendValueInput("TIME")
            .setCheck("time_in_millis");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("1 second is 1000 milliseconds");
        this.setHelpUrl("");
    }
};
*/


Blockly.JavaScript['wait'] = function (block) {
    var value_runtime = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
    return `await bot.wait(${value_runtime});\n`;
};
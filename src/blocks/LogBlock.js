
import Blockly from 'node-blockly/browser';

Blockly.Blocks['log'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("print");
        this.appendValueInput("PRINTABLE")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('Print value to console');
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['log'] = function (block) {
    var value_printable = Blockly.JavaScript.valueToCode(block, 'PRINTABLE', Blockly.JavaScript.ORDER_ATOMIC);
    return `bot.log( ${value_printable} );\n`
};

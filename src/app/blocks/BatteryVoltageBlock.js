"use strict";

Blockly.Blocks['battery_voltage'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Battery voltage");
        this.setOutput(true, null);
        this.setColour(30);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.JavaScript['battery_voltage'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = `bot.battery.voltage`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};
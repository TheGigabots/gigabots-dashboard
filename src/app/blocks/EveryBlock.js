"use strict";

Blockly.Blocks['every'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("every")
            .appendField(new Blockly.FieldNumber(0, 0, 9999999), "WAITTIME")
            .appendField(new Blockly.FieldDropdown([["milliseconds","milliseconds"], ["seconds","seconds"]]), "TIMESCALE");
        this.appendStatementInput("BODY")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip('1 second is 1000 milliseconds');
        this.setHelpUrl('');
    }
};


Blockly.JavaScript['every'] = function(block) {
    var number_waittime = block.getFieldValue('WAITTIME');
    var dropdown_timescale = block.getFieldValue('TIMESCALE');
    var statements_body = Blockly.JavaScript.statementToCode(block, 'BODY');

    let ms = number_waittime;

    if (dropdown_timescale == 'seconds') {
        ms = Number(number_waittime) * 1000;
    }

    var func = [];
    func.push('setInterval(function(){');
    func.push(statements_body );
    func.push(`}, ${ms})`);
    return func.join('\n');
};
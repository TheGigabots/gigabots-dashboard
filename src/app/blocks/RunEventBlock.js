'use strict';

Blockly.Blocks['run_event'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Run");
        this.appendStatementInput("BODY")
            .setCheck(null)
            .appendField("do");
        this.setColour(230);
        this.setTooltip('Event fires after Startup');
        this.setHelpUrl('');
    }
};


Blockly.JavaScript['run_event'] = function (block) {
    var statements_body = Blockly.JavaScript.statementToCode(block, 'BODY');
    var func = [];
    func.push('function onRun( ) {');
    func.push(Blockly.JavaScript.statementToCode(block, 'BODY'));
    func.push('}');
    return func.join('\n');
};
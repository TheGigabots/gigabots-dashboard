import Blockly from 'node-blockly/browser';
Blockly.Blocks['start_event'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Startup");
        this.appendStatementInput("BODY")
            .setCheck(null)
            .appendField("do");
        this.setColour(0);
        this.setTooltip('Event fires when robot starts');
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['start_event'] = function (block) {
    var func = [];
    func.push('function onStart( done ) {');
    func.push(Blockly.JavaScript.statementToCode(block, 'BODY'));
    func.push('  done(); \n');
    func.push('}');
    return func.join('\n');
};
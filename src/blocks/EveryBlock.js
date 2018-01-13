import Blockly from 'node-blockly/browser';


/*
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
*/


Blockly.JavaScript['every'] = function(block) {
    var value_runtime = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_body = Blockly.JavaScript.statementToCode(block, 'BODY');

    var func = [];
    func.push('setInterval( async () =>{');
    func.push(statements_body );
    func.push(`}, ${value_runtime})`);
    return func.join('\n');
};
import Blockly from 'node-blockly/browser';

Blockly.JavaScript['every'] = function(block) {
    var value_runtime = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_body = Blockly.JavaScript.statementToCode(block, 'BODY');

    var func = [];
    func.push('setInterval( async () =>{');
    func.push(statements_body );
    func.push(`}, ${value_runtime})`);
    return func.join('\n');
};
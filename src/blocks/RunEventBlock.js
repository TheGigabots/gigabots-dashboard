import Blockly from 'node-blockly/browser';

Blockly.JavaScript['run_event'] = function (block) {
    var func = [];
    func.push('onRun = async () => {');
    func.push(Blockly.JavaScript.statementToCode(block, 'BODY'));
    func.push('}');
    return func.join('\n');
};
import Blockly from 'node-blockly/browser';


Blockly.JavaScript['start_event'] = function (block) {
    var func = [];
    func.push('onStart = (done) => {');
    func.push(Blockly.JavaScript.statementToCode(block, 'BODY'));
    func.push('  done(); \n');
    func.push('}');
    return func.join('\n');
};
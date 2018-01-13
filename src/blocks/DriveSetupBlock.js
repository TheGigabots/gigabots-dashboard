import Blockly from 'node-blockly/browser';

Blockly.JavaScript['drive_setup'] = function (block) {
    let value_left = Blockly.JavaScript.valueToCode(block, 'LEFT', Blockly.JavaScript.ORDER_ATOMIC);
    let value_right = Blockly.JavaScript.valueToCode(block, 'RIGHT', Blockly.JavaScript.ORDER_ATOMIC);

    const func = [];

    const ph = "({ motor:'', reverse: false})";

    if(!value_left) {
        value_left = ph;
    }

    if(!value_right) {
        value_right = ph;
    }

    func.push(`let left = ${value_left}`);
    func.push(`let right = ${value_right}`);
    func.push(`bot.drive.leftOutput( left.motor, left.reverse )`);
    func.push(`bot.drive.rightOutput( right.motor, right.reverse )\n`);
    return func.join('\n');
};
import Blockly from 'node-blockly/browser';

Blockly.Blocks['drive_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Drive Setup");
        this.appendDummyInput()
            .appendField("Left");
        this.appendValueInput("LEFT")
            .setCheck("motor_output");
        this.appendDummyInput()
            .appendField("Right");
        this.appendValueInput("RIGHT")
            .setCheck("motor_output");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.JavaScript['drive_setup'] = function (block) {
    var value_left = Blockly.JavaScript.valueToCode(block, 'LEFT', Blockly.JavaScript.ORDER_ATOMIC);
    var value_right = Blockly.JavaScript.valueToCode(block, 'RIGHT', Blockly.JavaScript.ORDER_ATOMIC);

    const func = [];

    func.push(`var left = ${value_left}`);
    func.push(`var right = ${value_right}`);
    func.push(`bot.drive.leftOutput( left.motor, left.reverse )`);
    func.push(`bot.drive.rightOutput( right.motor, right.reverse )\n`);
    return func.join('\n');
};
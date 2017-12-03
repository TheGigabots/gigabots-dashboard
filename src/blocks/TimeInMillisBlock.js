import Blockly from 'node-blockly/browser';

Blockly.Blocks['time_in_millis'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Time")
            .appendField(new Blockly.FieldNumber(1, 1, 100000), "TIME")
            .appendField(new Blockly.FieldDropdown([["seconds","seconds"], ["milliseconds","milliseconds"]]), "TIMESCALE");
        this.setOutput(true, null);
        this.setColour(0);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};


Blockly.JavaScript['time_in_millis'] = function (block) {
    var number_time = block.getFieldValue('TIME');
    var dropdown_timescale = block.getFieldValue('TIMESCALE');
    let time = number_time;
    if (dropdown_timescale === 'seconds') {
        time = time * 1000;
    }
    var code = `${time}`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};
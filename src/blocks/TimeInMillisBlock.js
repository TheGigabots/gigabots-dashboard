import Blockly from 'node-blockly/browser';

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
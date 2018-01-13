import Blockly from 'node-blockly/browser';

Blockly.JavaScript['battery_voltage'] = function(block) {
    return [`bot.battery.voltage`, Blockly.JavaScript.ORDER_NONE];
};
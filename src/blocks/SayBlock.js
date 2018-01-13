import Blockly from 'node-blockly/browser';

import Motors from './Motors';

Blockly.JavaScript['say'] = function (block) {
    var value_texttosay = Blockly.JavaScript.valueToCode(block, 'textToSay');
    var number_speed = block.getFieldValue('SPEED');
    var number_pitch = block.getFieldValue('PITCH');

    let convertedSpeed = Math.round(Motors.convertRange(number_speed, 0, 100, 80, 450));
    let convertedPitch = Math.round(Motors.convertRange(number_pitch, 0, 100, 0, 99));

    return `bot.speech.say(${value_texttosay}, ${convertedSpeed}, ${convertedPitch} , 0 );\n`
};

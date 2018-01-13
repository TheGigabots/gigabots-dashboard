import Blockly from 'node-blockly/browser';

Blockly.JavaScript['drive_control'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var number_speed = block.getFieldValue('SPEED');

    //Convert from percent to rotation speed
    var rotationSpeed = Math.round((number_speed * 1024) / 100);

    // TODO: Assemble JavaScript into code variable.
    var code = `bot.drive.${dropdown_name}( ${rotationSpeed} );\n`
    return code;
};
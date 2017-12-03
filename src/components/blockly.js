/**
 * Helper for blockly
 */
let Blockly;
if (typeof window !== 'undefined') {
    Blockly = require('node-blockly/browser-raw');
} else {
    Blockly = require('node-blockly/_blockly');
}
const blocklyJS = require('node-blockly/lib/javascript_compressed');
blocklyJS(Blockly);
module.exports = Blockly;

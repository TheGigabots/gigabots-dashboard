import Blockly from 'node-blockly/browser';


export function init (calculate, validate) {

    /**
     * This needs to not be commented out.  The FieldDropdown can't be configured via JSON or exported
     * from editor.  It will just override the stub in customBlocks.js
     *
     * @type {{init: Blockly.Blocks.friend_input.init}}
     */
    Blockly.Blocks['friend_input'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("Friend")
                .appendField(new Blockly.FieldDropdown(calculate, validate), "NAME");
            this.setOutput(true, null);
            this.setColour(0);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };


    Blockly.JavaScript['friend_input'] = function(block) {
        var dropdown_name = block.getFieldValue('NAME');
        return [dropdown_name, Blockly.JavaScript.ORDER_NONE]
    };

}






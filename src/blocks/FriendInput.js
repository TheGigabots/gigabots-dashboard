import Blockly from 'node-blockly/browser';


export function init (calculate, validate) {

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






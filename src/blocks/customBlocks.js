import Blockly from 'node-blockly/browser';

Blockly.Blocks['battery_voltage'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Battery Voltage");
    this.setOutput(true, null);
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['beep'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Beep Frequency")
        .appendField(new Blockly.FieldNumber(100, 20, 10000, 1), "FREQUENCY")
        .appendField("Hz")
        .appendField("Time");
    this.appendValueInput("DURATION")
        .setCheck("time_in_millis");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['time_in_millis'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Time")
        .appendField(new Blockly.FieldNumber(1, 1, 100000, 1), "TIME")
        .appendField(new Blockly.FieldDropdown([["seconds","seconds"], ["milliseconds","milliseconds"]]), "TIMESCALE");
    this.setOutput(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['color_sensor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Color Sensor")
        .appendField("shortCode");
    this.appendValueInput("shortCode")
        .setCheck("friend_input");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['friend_input'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Friend Block STUB");
    this.setOutput(true, null);
    this.setColour(0);
 this.setTooltip("Just a stub, this has to be defined in JS");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['color_sensor_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Color")
        .appendField(new Blockly.FieldDropdown([["BLACK","1"], ["BLUE","2"], ["GREEN","3"], ["YELLOW","4"], ["RED","5"], ["WHITE","6"], ["BROWN","7"]]), "COLOR");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("Use this block to check the color sensor");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['drive_control'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Drive Control")
        .appendField(new Blockly.FieldDropdown([["forward","forward"], ["backward","backward"], ["left","left"], ["right","right"], ["stop","stop"]]), "NAME")
        .appendField("Speed")
        .appendField(new Blockly.FieldNumber(50, 0, 100, 1), "SPEED");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['drive_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Drive Setup");
    this.appendValueInput("LEFT")
        .setCheck("motor_output");
    this.appendValueInput("RIGHT")
        .setCheck("motor_output");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['every'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("every")
        .appendField("Time");
    this.appendValueInput("TIME")
        .setCheck("time_in_millis");
    this.appendStatementInput("BODY")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['ir_sensor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Infrared Sensor")
        .appendField("shortCode");
    this.appendValueInput("shortCode")
        .setCheck("friend_input");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['led'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LED")
        .appendField(new Blockly.FieldDropdown([["left","left"], ["right","right"]]), "POS_DROPDOWN")
        .appendField("Color")
        .appendField(new Blockly.FieldDropdown([["red","red"], ["green","green"], ["off","off"]]), "COLOR_DROPDOWN");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['log'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("print")
        .appendField("string");
    this.appendValueInput("PRINTABLE")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


/*
 https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#8cpz6d
 */
const toolbox = `<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
  <category name="Basic" colour="#a55b5b">
    <block type="start_event"></block>
    <block type="run_event"></block>
    <block type="time_in_millis">
      <field name="TIME">1</field>
      <field name="TIMESCALE">seconds</field>
    </block>
    <block type="led">
      <field name="POS_DROPDOWN">left</field>
      <field name="COLOR_DROPDOWN">red</field>
    </block>
    <block type="text">
      <field name="TEXT"></field>
    </block>
    <block type="friend_input">
      <field name="NAME">bot</field>
    </block>
  </category>
  <category name="Audio">
    <block type="say">
      <field name="SPEED">175</field>
      <field name="PITCH">50</field>
      <field name="FORMANT">0</field>
      <value name="textToSay">
        <block type="text">
          <field name="TEXT">I'm a gigabot</field>
        </block>
      </value>
    </block>
    <block type="beep">
      <field name="FREQUENCY">20</field>
      <field name="DURATION">1</field>
    </block>
  </category>
  <category name="Input">
    <block type="battery_voltage"></block>
    <block type="touch_sensor">
      <value name="shortCode">
        <block type="friend_input">
          <field name="NAME">bot</field>
        </block>
      </value>
    </block>
    <block type="ir_sensor">
      <value name="shortCode">
        <block type="friend_input">
          <field name="NAME">bot</field>
        </block>
      </value>
    </block>
    <block type="color_sensor">
      <value name="shortCode">
        <block type="friend_input">
          <field name="NAME">bot</field>
        </block>
      </value>
    </block>
    <block type="ultrasonic_sensor">
      <value name="shortCode">
        <block type="friend_input">
          <field name="NAME">bot</field>
        </block>
      </value>
    </block>
  </category>
  <category name="Motors">
    <block type="drive_setup">
      <value name="LEFT">
        <block type="motor_output">
          <field name="MOTOR">A</field>
          <field name="REVERSE">FALSE</field>
        </block>
      </value>
      <value name="RIGHT">
        <block type="motor_output">
          <field name="MOTOR">B</field>
          <field name="REVERSE">FALSE</field>
        </block>
      </value>
    </block>
    <block type="drive_control">
      <field name="NAME">forward</field>
      <field name="SPEED">0</field>
    </block>
    <block type="run_motor_speed">
      <field name="SPEED">0</field>
      <value name="MOTOR">
        <block type="motor_output">
          <field name="MOTOR">A</field>
          <field name="REVERSE">TRUE</field>
        </block>
      </value>
    </block>
    <block type="run_motor_time">
      <field name="SPEED">0</field>
      <value name="MOTOR">
        <block type="motor_output">
          <field name="MOTOR">A</field>
          <field name="REVERSE">TRUE</field>
        </block>
      </value>
      <value name="RUNTIME">
        <block type="time_in_millis">
          <field name="TIME">1</field>
          <field name="TIMESCALE">seconds</field>
        </block>
      </value>
    </block>
    <block type="stop_motor">
      <value name="MOTOR">
        <block type="motor_output">
          <field name="MOTOR">A</field>
          <field name="REVERSE">TRUE</field>
        </block>
      </value>
    </block>
    <block type="motor_output">
      <field name="MOTOR">A</field>
      <field name="REVERSE">TRUE</field>
    </block>
  </category>
  <category name="Loops">
    <block type="wait">
      <value name="TIME">
        <block type="time_in_millis">
          <field name="TIME">1</field>
          <field name="TIMESCALE">seconds</field>
        </block>
      </value>
    </block>
    <block type="every">
      <field name="WAITTIME">0</field>
      <field name="TIMESCALE">milliseconds</field>
    </block>
    <block type="controls_flow_statements" disabled="true">
      <field name="FLOW">BREAK</field>
    </block>
  </category>
  <category name="Logic" colour="#5C81A6">
    <block type="controls_if"></block>
    <block type="logic_compare">
      <field name="OP">EQ</field>
    </block>
    <block type="logic_operation">
      <field name="OP">AND</field>
    </block>
    <block type="logic_negate"></block>
    <block type="logic_boolean">
      <field name="BOOL">TRUE</field>
    </block>
    <block type="logic_null"></block>
    <block type="logic_ternary"></block>
  </category>
  <category name="Math">
    <block type="math_number">
      <field name="NUM">0</field>
    </block>
    <block type="math_arithmetic">
      <field name="OP">ADD</field>
      <value name="A">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="B">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
    </block>
    <block type="math_round">
      <field name="OP">ROUND</field>
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">3.1</field>
        </shadow>
      </value>
    </block>
  </category>
</xml>`


export default toolbox;
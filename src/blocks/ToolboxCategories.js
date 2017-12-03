"use strict";



module.exports = [
    {
        name: "Events",
        blocks: [
            {type: "start_event"},
            {type: "run_event"}
        ]
    },
    {
        name: "Sound",
        blocks: [
            {
                type: "say",
                values: {
                    "textToSay": {
                        type: "text",
                        shadow: true,
                        fields: {
                            "TEXT": "I'm a gigabot!"
                        }
                    }
                }

            },
            {type: "beep"},
        ]
    },
    {
        name: "Actions",
        blocks: [
            {type: "led"},
            {
                type: "log",
                values: {
                    "PRINTABLE": {
                        type: "text",
                        fields: {
                            "TEXT": 'hello world!'
                        }
                    }
                }
            },
            {type: "run_motor_time"},
            {type: "drive_setup"},
            {type: "motor_output"},
            {type: "drive_control"}


        ]
    },
    {
        name: "Timing",
        blocks: [

            {
                type: "time_in_millis"
            }
        ]
    },
    {
        name: "Loops",
        blocks: [
            {type: "controls_repeat_ext"},
            {type: "controls_whileUntil"},
            {type: "controls_flow_statements"},
            {
                type: "wait",
                fields: {
                    "WAITTIME": 1,
                    "TIMESCALE":"seconds"
                }
            },
            {
                type: "every",
                fields: {
                    "WAITTIME": 1,
                    "TIMESCALE":"seconds"
                }
            },
        ]
    },
    {
        name: "Math",
        blocks: [
            {
                type: "math_number",

            },
            {
                type: "math_arithmetic",
                values: {
                    "A": {
                        type: "math_number",
                        shadow: true
                    },
                    "B": {
                        type: "math_number",
                        shadow: true
                    }
                }
            },
            {
                type: "math_round",
                values: {
                    "A": {
                        type: "math_number",
                        shadow: true
                    },
                    "B": {
                        type: "math_number",
                        shadow: true
                    }
                }
            },

        ]
    },
    {
        name: "Sensors",
        blocks: [
            {
                type: "battery_voltage"
            },
            {
                type: "touch_sensor",
                values: {
                    "shortCode": {
                        type: "text",
                        shadow: true,
                        fields: {
                            "TEXT": "bot"
                        }
                    }
                }
            },
            {
                type: "ir_sensor",
                values: {
                    "shortCode": {
                        type: "text",
                        shadow: true,
                        fields: {
                            "TEXT": "bot"
                        }
                    }
                }
            },
            {
                type: "color_sensor",
                values: {
                    "shortCode": {
                        type: "text",
                        shadow: true,
                        fields: {
                            "TEXT": "bot"
                        }
                    }
                }
            },
            {
                type: "ultrasonic_sensor",
                values: {
                    "shortCode": {
                        type: "text",
                        shadow: true,
                        fields: {
                            "TEXT": "bot"
                        }
                    }
                }
            },
        ]
    },
    {
        name: "Logic",
        blocks: [
            {type: "logic_compare"},
            {type: "controls_if"}
        ]
    },

    {
        name: "Text",
        blocks: [
            {type: "text"}
        ]
    }
]
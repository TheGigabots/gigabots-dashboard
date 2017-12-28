import React from "react";
import PropTypes from 'prop-types';
import {IconButton} from 'material-ui';
import {grey} from "material-ui/colors";
import DeleteIcon from "material-ui-icons/Delete";
import {Controlled as CodeMirror} from 'react-codemirror2'


export default class JavascriptViewer extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {

        return (
            <CodeMirror value={this.props.javascript} options={{
                mode: 'javascript',
                theme: 'material',
                readOnly: true
            }}/>
        )

    }

}
JavascriptViewer.propTypes = {
    javascript: PropTypes.string
}
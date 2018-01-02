import React from "react";
import PropTypes from 'prop-types';
import {Controlled as CodeMirror} from 'react-codemirror2'

export default class JavascriptViewer extends React.Component {
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
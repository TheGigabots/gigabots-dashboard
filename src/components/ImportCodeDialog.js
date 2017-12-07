import React from "react";
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'
import Dialog, {DialogContent, DialogTitle} from 'material-ui/Dialog';
import UploadIcon from 'material-ui-icons/FileUpload';
import Typography from 'material-ui/Typography';
import {reactLocalStorage} from 'reactjs-localstorage';
import Blockly from 'node-blockly/browser';

export default class ImportCodeDialog extends React.Component {

    render() {
        return (
            <Dialog open={this.props.open}
                    onRequestClose={this.props.closeFunc}>
                <DialogTitle>Upload Code</DialogTitle>
                <DialogContent>
                    <Dropzone onDrop={this.onDrop.bind(this)} multiple={false}>
                        <Typography>Drag your code here.</Typography>
                        <UploadIcon/>
                    </Dropzone>
                </DialogContent>
            </Dialog>
        )
    }

    onDrop(files) {
        let reader = new FileReader();

        reader.onload = (e) => {

            let xmlText = e.target.result;

            try {
                let dom = Blockly.Xml.textToDom(xmlText)
                //todo other dom tests?
                reactLocalStorage.set("editorXML", xmlText);
                this.props.codeUploadedFunc();
            }
            catch(e) {
                console.error(e);
            }
        }

        reader.readAsText(files[0]);
        this.setState({
            files
        });
    }
}


ImportCodeDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    closeFunc: PropTypes.func.isRequired,
    codeUploadedFunc: PropTypes.func.isRequired
}



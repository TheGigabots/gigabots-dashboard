import React from "react";
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import {withStyles} from 'material-ui/styles';
import DownloadIcon from 'material-ui-icons/FileDownload';
import UploadIcon from 'material-ui-icons/FileUpload';
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: 430,
        marginTop: theme.spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
    },
    drawerHeader: theme.mixins.toolbar,
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
});

class Footer extends React.Component {


    render() {
        return (
            <div className={this.props.classes.root}>
            <Drawer
                variant="permanent"
                anchor="bottom"
            >
                <Grid container >
                    <Grid item xs={3}>
                        <Button onClick={this.props.downloadFunc}>
                            <DownloadIcon/>
                            DOWNLOAD CODE
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={this.props.uploadFunc}>
                            <UploadIcon/>
                            UPLOAD CODE
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                </Grid>
            </Drawer>
            </div>
        )
    }
}

Footer.propTypes = {
    downloadFunc: PropTypes.func.isRequired,
    uploadFunc: PropTypes.func.isRequired
}


export default withStyles(styles)(Footer);
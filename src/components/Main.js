import React from "react";
import {Snackbar} from "material-ui";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Menu, {MenuItem} from 'material-ui/Menu';
import AppStore from "./../store/AppStore";
import ConnectToBotDialog from "./ConnectToBotDialog";
import Designer from './Designer'
import Gigabot from "./Gigabot";
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import GigabotIcon from 'material-ui-icons/DeveloperBoard';
import {withStyles} from 'material-ui/styles';
import S from "string";
import ConfigurationDialog from './ConfigurationDialog'
import Friends from './Friends';
import ImportCodeDialog from './ImportCodeDialog';
import Divider from 'material-ui/Divider';
import {CloudUpload, PlayCircleOutline, Settings, Stop} from "material-ui-icons";
import {blueGrey, green, red, yellow} from 'material-ui/colors';
import Switch from 'material-ui/Switch';
import {FormControlLabel} from 'material-ui/Form';
import JavascriptViewer from "./JavascriptViewer";
import * as Babel from "@babel/standalone";
import Footer from './Footer'


const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 1,
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    iconConnected: {
        fill: green[300]
    },
    iconDisconnected: {
        fill: yellow[500]
    },
    iconNotYetConnected: {
        fill: blueGrey[500]
    },
    iconPlay: {
        fill: green[500]
    },
    iconStop: {
        fill: red[900]
    }

});


class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = this.newState();
    }

    componentDidMount() {
        this.unsubscribe = AppStore.store.subscribe(() => {
            this.setState({
                con: AppStore.store.getState().con,
                auth: AppStore.store.getState().auth,
                gigabot: new Gigabot(AppStore.store.getState().gigabot),
            })
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    newState() {
        return {
            con: AppStore.store.getState().con,
            auth: AppStore.store.getState().auth,
            gigabot: new Gigabot(AppStore.store.getState().gigabot),
            designerCode: {xml: null, js: null, es5: null},
            connectDialog: false,
            configurationDialog: false,
            importCodeDialog: false,
            friendsDialog: false,
            profileMenu: false,
            loadDesignerFromLocalStorage: false,
            showCode: false
        }
    }

    render() {

        const {classes} = this.props;

        let snackbarConnectMessage = this.state.con.message;

        if (!snackbarConnectMessage) {
            snackbarConnectMessage = "";
        }

        let connectButtonClass = classes.iconNotYetConnected;
        let startButtonClass = classes.iconNotYetConnected;
        let stopButtonClass = classes.iconNotYetConnected;

        if (this.state.gigabot.id) {
            if (this.state.gigabot.connected) {
                connectButtonClass = classes.iconConnected
                startButtonClass = classes.iconPlay;
                stopButtonClass = classes.iconStop;
            }
            else {
                connectButtonClass = classes.iconDisconnected;
            }
        }

        return (
            <div className={classes.root}>
                <AppBar
                    position='static'
                >
                    <Toolbar>
                        <IconButton
                            disabled={!this.state.gigabot.connected}
                            onClick={() => this.handleCloudUpload()}>
                            <CloudUpload/>
                        </IconButton>
                        <IconButton
                            onClick={() => AppStore.startScript(this.state.gigabot.id)}
                            disabled={!this.state.gigabot.connected}>
                            <PlayCircleOutline className={startButtonClass}/>
                        </IconButton>
                        <IconButton
                            onClick={() => AppStore.stopScript(this.state.gigabot.id)}
                            disabled={!this.state.gigabot.connected}>
                            <Stop className={stopButtonClass}/>
                        </IconButton>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            THE GIGABOTS
                        </Typography>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.showCode}
                                    onChange={(event, checked) => this.setState({showCode: !this.state.showCode})}
                                />
                            }
                            label={"SHOW JAVASCRIPT"}
                        >

                        </FormControlLabel>

                        <IconButton
                            disabled={!this.state.gigabot.connected}
                            onClick={() => this.handleConfigDialog(true)}>
                            <Settings/>
                        </IconButton>
                        <IconButton
                            onClick={(e) => this.handleConnectMenu(e)}>
                            <GigabotIcon className={connectButtonClass}/>
                        </IconButton>
                        {this.state.gigabot.connected && this.rightMenu()}
                    </Toolbar>
                </AppBar>

                <ConnectToBotDialog open={this.state.connectDialog} cancelFunc={() => {
                    this.handleCancelBotDialog()
                }} connectFunc={(botId) => {
                    this.handleConnectBot(botId);
                }}/>

                <ConfigurationDialog
                    open={this.state.configurationDialog}
                    gigabot={this.state.gigabot}
                    cancelFunc={(open) => this.handleConfigDialog(open)}/>

                <Friends open={this.state.friendsDialog}
                         gigabot={this.state.gigabot}
                         closeFunc={() => {
                             this.setState({friendsDialog: false})
                         }}/>


                <ImportCodeDialog
                    open={this.state.importCodeDialog}
                    closeFunc={() => {
                        this.setState({importCodeDialog: false})
                    }}
                    codeUploadedFunc={() => {
                        this.setState({loadDesignerFromLocalStorage: true})
                    }}
                />

                <Snackbar
                    open={!this.state.con.connected}
                    message={this.state.con.message}
                    autoHideDuration={99999}
                />

                <Snackbar open={this.state.snackBarError}
                          message={this.state.snackBarError}
                />

                <Designer
                    loadFromLocalStorage={this.state.loadDesignerFromLocalStorage}
                    loadXMLFunc={() => this.handleDesignerLoadXML()}
                    codeChangeListener={(js, xml) => this.handleDesignerCodeChange(js, xml)}
                    gigabot={this.state.gigabot}
                />
                {this.state.showCode &&
                <div>
                    <Typography>Javascript</Typography>
                    < JavascriptViewer javascript={this.state.designerCode.js}/>
                </div>
                }
                {this.props.children}
                <Footer downloadFunc={() => this.handleDownloadFile()} uploadFunc={() => this.handleUpload()}/>
            </div>
        )
    }

    rightMenu() {
        return (
            <Menu
                open={this.state.profileMenu}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={() => {
                    this.setState({
                        anchorEl: null,
                        profileMenu: false
                    })
                }}
            >
                <MenuItem onClick={() => this.handleFriends()}>Friends</MenuItem>
                <Divider/>
                <Divider/>
                <MenuItem onClick={() => this.handleDisconnect()}>Disconnect</MenuItem>
            </Menu>
        )
    }

    handleDesignerCodeChange(js, xml) {
        let es5 = "";

        try {
            es5 = Babel.transform(js, {presets: ['es2017', 'es2015']}).code;
        } catch (e) {
            console.error(e);
        }

        this.setState({
            designerCode: {xml: xml, js: js, es5: es5}
        })
    }

    handleDesignerLoadXML() {
        this.setState({
            loadDesignerFromLocalStorage: false
        })
    }

    handleCloudUpload() {
        let botId = this.state.gigabot.id;
        AppStore.publishScript(botId, this.state.designerCode.es5);
    }

    handleDownloadFile() {
        if (this.state.designerCode && this.state.designerCode.xml) {
            var blob = new Blob([this.state.designerCode.xml], {type: "text/xml"})
                , uri = URL.createObjectURL(blob)
            let filename = 'gigabot.xml'

            var link = document.createElement('a');
            if (typeof link.download === 'string') {
                document.body.appendChild(link);
                link.download = filename;
                link.href = uri;
                link.click();
                document.body.removeChild(link);
            } else {
                window.location.replace(uri);
            }
        }
    }

    handleConfigDialog(open) {
        this.setState({
            configurationDialog: open
        })
    }

    handleCancelBotDialog() {
        this.setState({
            connectDialog: false
        })
    }

    handleFriends() {
        this.setState({
            profileMenu: false,
            friendsDialog: true,
            importCodeDialog: false,
        });
    }

    handleUpload() {
        this.setState({
            profileMenu: false,
            friendsDialog: false,
            importCodeDialog: true,
        });
    }


    handleDisconnect() {

        let id = this.state.gigabot.id;

        if (id) {
            console.log('Disconnecting from ->' + id);
            AppStore.disconnectFromBot(id);
        }

        this.setState({
            profileMenu: false
        })
    }

    handleConnectBot(botId) {
        if (S(botId).isEmpty()) {
            //TODO feedback.
        }
        else {
            AppStore.connectToBot(botId);
            AppStore.storeLocalBotId(botId);
            this.setState({
                connectDialog: !this.state.connectDialog
            })
        }
    }

    handleConnectMenu(event) {
        if (this.state.gigabot.connected) {
            this.setState({
                profileMenu: !this.state.profileMenu,
                anchorEl: event.currentTarget
            })
        }
        else {
            this.setState({
                connectDialog: !this.state.connectDialog
            })
        }
    }
}


export default withStyles(styles)(Main);
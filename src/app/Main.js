import React from "react";
import {AppBar, IconMenu, IconButton, MenuItem, Snackbar} from "material-ui";
import {withRouter} from "react-router";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppStore from "./store/AppStore";
import ConnectToBotPanel from "./ConnectToBotPanel";
import {Grid, Row, Col} from "react-flexbox-grid";

class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = this.newState();
    }

    componentDidMount() {
        this.unsubscribe = AppStore.store.subscribe(() => {
            this.setState(this.newState());
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    newState() {
        return {
            con: AppStore.store.getState().con,
            auth: AppStore.store.getState().auth
        }
    }

    menu() {
        return (
            <IconMenu
                iconButtonElement={<IconButton><MenuIcon /></IconButton>}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                <MenuItem onClick={() => this.props.router.push("/") }>Home</MenuItem>
                <MenuItem onClick={() => this.props.router.push("/botTest") }>Controls</MenuItem>
                <MenuItem onClick={() => this.props.router.push("/designer") }>Designer</MenuItem>
            </IconMenu>
        );
    }

    render() {

        let snackbarConnectMessage = this.state.con.message;

        if (!snackbarConnectMessage) {
            snackbarConnectMessage = "";
        }

        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title="The Gigabots!"
                        iconElementLeft={this.menu()}
                    />
                    <Snackbar
                        open={!this.state.con.connected}
                        message={this.state.con.message}
                        action="undo"
                        autoHideDuration={99999}
                        onActionTouchTap={this.handleActionTouchTap}
                        onRequestClose={this.handleRequestClose}
                    />
                    <Grid>
                        <Row >
                            <Col xs={3} xsOffset={9}>
                                <ConnectToBotPanel/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                {this.props.children}
                            </Col>
                        </Row>
                    </Grid>

                </div>
            </MuiThemeProvider>
        )
    }
}
module.exports = withRouter(Main);
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from "react-redux";
import AppStore from "./../store/AppStore";
import routes from "./../components/Routes"
import {withStyles} from 'material-ui/styles';
import withRoot from '../components/withRoot';


const styles = {

}

class Index extends Component {

    render() {
        return (
            <div className={this.props.classes.root}>
                <Provider store={AppStore.store}>
                    {routes}
                </Provider>
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));

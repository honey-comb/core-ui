import React, {Component} from 'react';
import {connect} from "react-redux";
import {changeMainView, loadConfig, VIEW_LOGIN} from "./actions/main-view-actions";
import LoginForm from "./components/LoginForm";
import * as PropTypes from "prop-types";
import {Configuration} from "./helpers/Configuration";


class MainView extends Component {

    constructor(props) {
        super(props);

        Configuration.domain = props.domain;
    }

    /**
     * @returns {*}
     */
    render() {

        switch (this.props.mainView.view) {

            case VIEW_LOGIN:

                return <LoginForm/>;

            default:

                this.props.loadConfig(this.props.configUrl);
                return <div/>;
        }
    }
}

MainView.propTypes = {
    configUrl: PropTypes.string.isRequired
};

/**
 * Mapping state to props
 *
 * @param state
 * @param props
 * @returns {{mainView: Function}}
 */
const mapStateToProps = (state, props) => {

    return {
        mainView: state.mainView
    }
};

/**
 * Mapping actions to props
 *
 * @type {{changeMainView: changeMainView}}
 */
const mapActionsToProps = {
    changeMainView: changeMainView,
    loadConfig: loadConfig,
};

export default connect(mapStateToProps, mapActionsToProps)(MainView);

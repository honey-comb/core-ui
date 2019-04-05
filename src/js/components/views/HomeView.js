import React from 'react';
import {connect} from "react-redux";
import {CoreView} from "./CoreView";
import AuthView from "./AuthView";
import * as PropTypes from "prop-types";
import DashboardComponent from "../dashboard/DashboardComponent";
import {App} from "../../App";

class HomeView extends CoreView {

    constructor(props) {
        super(props);

        /**
         * Adding default view
         * @type {string}
         */
        this.default = 'auth';

        if (App.services.view.getConfig('user')) {
            this.default = 'dashboard';
        }

        /**
         * Registering all views under this component
         */
        this.routes = {
            'auth': AuthView,
            'dashboard': DashboardComponent,
        };
    }
}


/**
 *
 * @type {Object}
 */
HomeView.propTypes = {
    config: PropTypes.object,
    level: PropTypes.number,
};

/**
 * Mapping state to props
 *
 * @param state
 * @param props
 * @returns {Object}
 */
const mapStateToProps = (state, props) => {

    return {
        level: 1,
        config: App.services.view.all()
    }
};

/**
 * Mapping actions to props
 */
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(HomeView);

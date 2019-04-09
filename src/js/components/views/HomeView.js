import React from 'react';
import {connect} from "react-redux";
import {CoreView} from "./CoreView";
import AuthView from "./AuthView";
import * as PropTypes from "prop-types";
import DashboardComponent from "../dashboard/DashboardComponent";
import {App} from "../../App";

class HomeView extends CoreView {


    /**
     * Default view key
     *
     * @returns {string}
     */
    getDefaultRouteKey() {
        if (App.services.view.getConfig('user')) {
            return 'dashboard';
        }

        return 'auth';
    }


    /**
     * Get views
     *
     * @returns {Object}
     */
    getRoutes() {
        return {
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

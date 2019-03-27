import React from 'react';
import {connect} from "react-redux";
import {CoreView} from "./CoreView";
import AuthView from "./AuthView";
import * as PropTypes from "prop-types";
import DashboardComponent from "../dashboard/DashboardComponent";
import {Globals} from "../../helpers/Globals";

class HomeView extends CoreView {

    constructor(props) {
        super(props);

        /**
         * Adding default view
         * @type {string}
         */
        this.default = 'auth';

        if (Globals.config.get().config && Globals.config.get().config.user) {
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

HomeView.propTypes = {
    config: PropTypes.object,
    level: PropTypes.number,
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
        level: 1,
        config: Globals.config.get()
    }
};

/**
 * Mapping actions to props
 */
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(HomeView);

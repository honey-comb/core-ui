import React from 'react';
import {connect} from "react-redux";
import {CoreView} from "./CoreView";
import LoginComponent from "../auth/LoginComponent";
import * as PropTypes from "prop-types";
import RegisterComponent from "../auth/RegisterComponent";
import PasswordRemindComponent from "../auth/PasswordRemindComponent";
import PasswordResetComponent from "../auth/PasswordResetComponent";

class AuthView extends CoreView {


    /**
     * Default view key
     *
     * @returns {string}
     */
    getDefaultRouteKey() {
        return 'login';
    }

    /**
     * Get views
     *
     * @returns {Object}
     */
    getRoutes() {
        return {
            'login': LoginComponent,
            'register': RegisterComponent,
            'password-remind': PasswordRemindComponent,
            'password-reset': PasswordResetComponent,
        }
    }
}

/**
 *
 * @type {Object}
 */
AuthView.propTypes = {
    level: PropTypes.number.isRequired
};

/**
 * Mapping state to props
 *
 * @param state
 * @param props
 * @returns {Object}
 */
const mapStateToProps = (state, props) => {
    return {}
};

/**
 * Mapping actions to props
 */
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(AuthView);

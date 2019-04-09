import React from 'react';
import {connect} from "react-redux";
import * as PropTypes from "prop-types";

import CoreView from "./CoreView";
import LoginComponent from "../components/auth/LoginComponent";
import RegisterComponent from "../components/auth/RegisterComponent";
import PasswordResetComponent from "../components/auth/PasswordResetComponent";
import PasswordRemindComponent from "../components/auth/PasswordRemindComponent";

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

    renderChildView() {
        return super.renderChildView();
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

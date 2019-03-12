import React from 'react';
import {connect} from "react-redux";
import {CoreView} from "../shared/CoreView";
import LoginComponent from "../auth/LoginComponent";
import * as PropTypes from "prop-types";
import RegisterComponent from "../auth/RegisterComponent";
import PasswordRemindComponent from "../auth/PasswordRemindComponent";
import PasswordResetComponent from "../auth/PasswordResetComponent";

class AuthView extends CoreView {

    constructor(props) {
        super(props);

        /**
         * Adding default view
         * @type {string}
         */
        this.default = 'login';

        /**
         * Registering all views under this component
         */

        this.routes = {
            'login': LoginComponent,
            'register': RegisterComponent,
            'password-remind': PasswordRemindComponent,
            'password-reset': PasswordResetComponent,
        }
    }
}

AuthView.propTypes = {
    level: PropTypes.number.isRequired
};

/**
 * Mapping state to props
 *
 * @param state
 * @param props
 * @returns {{mainView: Function}}
 */
const mapStateToProps = (state, props) => {

    return {}
};

/**
 * Mapping actions to props
 */
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(AuthView);

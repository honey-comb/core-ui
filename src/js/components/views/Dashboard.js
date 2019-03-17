import React from 'react';
import {connect} from "react-redux";
import {CoreView} from "../shared/CoreView";
import * as PropTypes from "prop-types";

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

    return {
    }
};

/**
 * Mapping actions to props
 */
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(AuthView);

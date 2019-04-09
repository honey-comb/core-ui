import React from "react";
import * as PropTypes from "prop-types";

import {App} from "../../../App";
import BaseField from "./BaseField";
import TextField from "@material-ui/core/TextField/TextField";

export default class Email extends BaseField {

    getInput() {

        return <TextField
            error={!this.isValid()}
            id={this.props.id}
            label={this.props.label}
            required={this.props.required}
            autoComplete="email"
            variant="outlined"
            value={this.props.value}
            disabled={this.props.isDisabled}
            onChange={(e) => {

                this.handleNaturalChange(e.target.value);
            }}
        />
    }

    /**
     * Validating email
     *
     * @param value
     * @returns {*}
     */
    isValueValid(value) {
        if (value) {
            return App.validation.validateEmail(value);
        }

        return true;
    }
}

Email.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    formId: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    annotation: PropTypes.string,
    required: PropTypes.bool,
    isDisabled: PropTypes.bool
};

Email.defaultProps = {
    isDisabled: false,
    required: false,
    value: '',
    defaultValue: '',
};

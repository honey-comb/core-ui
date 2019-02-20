import React from "react";
import * as PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField/TextField";
import {Helpers} from "../../../helpers/Helpers";
import BaseField from "./BaseField";

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
    isValueValid (value)
    {
        return value ? Helpers.validateEmail(value) : true
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
    required: PropTypes.bool
};

Email.defaultProps = {
    required: false,
    value: '',
    defaultValue: '',
};

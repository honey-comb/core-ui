import React from "react";
import * as PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField/TextField";
import BaseField from "./BaseField";

export default class Password extends BaseField {

    getInput() {

        return <TextField
            error={!this.isValid()}
            id={this.props.id}
            label={this.props.label}
            required={this.props.required}
            variant="outlined"
            type="password"
            value={this.props.value}
            disabled={this.props.isDisabled}
            onChange={(e) => {

                this.handleNaturalChange(e.target.value);
            }}
        />
    }

    /**
     * Validating field value
     *
     * @param value
     * @returns {boolean}
     */
    isValueValid(value) {

        return (value && value.length >= this.props.properties.minLength);
    }
}

Password.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    formId: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    annotation: PropTypes.string,
    required: PropTypes.bool,
    isDisabled: PropTypes.bool,
    properties: PropTypes.object
};

Password.defaultProps = {
    required: false,
    isDisabled: false,
    value: '',
    defaultValue: '',
    properties: {
        minLength: 1
    }
};

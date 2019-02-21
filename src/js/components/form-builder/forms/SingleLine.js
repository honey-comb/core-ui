import React from "react";
import * as PropTypes from "prop-types";
import BaseField from "./BaseField";
import TextField from "@material-ui/core/TextField/TextField";

export default class SingleLine extends BaseField {

    getInput() {

        return <TextField
            error={!this.isValid()}
            id={this.props.id}
            label={this.props.label}
            required={this.props.required}
            variant="outlined"
            value={this.props.value}
            disabled={this.props.isDisabled}
            onChange={(e) => {

                this.handleNaturalChange(e.target.value);
            }}
        />
    }
}

SingleLine.propTypes = {
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

SingleLine.defaultProps = {
    required: false,
    isDisabled: false,
    defaultValue: '',
    value: '',
};

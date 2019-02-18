import React from "react";
import * as PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField/TextField";
import BaseField from "./BaseField";

export default class Password extends BaseField {

    render() {

        return this.getDefaultRender();
    }

    getInput() {
        return <TextField
            error={this.error}
            id={this.props.id}
            label={this.props.label}
            required={this.props.required}
            variant="outlined"
            type="password"
            onChange={(e) => {

                this.error = e.target.value.length < this.props.properties.minLength;

                this.props.onChange(this.props.id, e.target.value);
            }}
        />
    }
}

Password.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    formId: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    annotation: PropTypes.string,
    required: PropTypes.bool
};

Password.defaultProps = {
    required: false,
    properties: {
        minLength: 1
    }
};

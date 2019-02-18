import React from "react";
import * as PropTypes from "prop-types";
import BaseField from "./BaseField";
import TextField from "@material-ui/core/TextField/TextField";

export default class SingleLine extends BaseField {

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
            defaultValue={this.props.defaultValue}
            onChange={(e) => {

                //TODO check for max min length from properties
                this.props.onChange(this.props.id, e.target.value);
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
    required: PropTypes.bool
};

SingleLine.defaultProps = {
    required: false,
};

import React from "react";
import * as PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField/TextField";
import {Helpers} from "../../../helpers/Helpers";
import BaseField from "./BaseField";

export default class Email extends BaseField {

    getInput() {
        return <TextField
            error={this.error}
            id={this.props.id}
            label={this.props.label}
            required={this.props.required}
            autoComplete="email"
            variant="outlined"
            defaultValue={this.props.defaultValue}
            onChange={(e) => {

                this.error = !Helpers.validateEmail(e.target.value);

                this.props.onChange(this.props.id, e.target.value);
            }}
        />
    }

    render() {

        return this.getDefaultRender()
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
};

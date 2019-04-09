import React from "react";
import * as PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import BaseField from "./BaseField";

export default class CheckBox extends BaseField {

    render() {
        return <FormControlLabel
            label={this.props.label}
            control={
                <Checkbox value={this.props.id}
                          color="primary"
                          checked={ this.props.value}
                          disabled={this.props.isDisabled}
                          onChange={(e) => {
                              this.handleNaturalChange(e.target.checked);
                          }}/>
            }
        />
    }
}

CheckBox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    formId: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool,
    isDisabled: PropTypes.bool,
    defaultValue: PropTypes.bool,
    annotation: PropTypes.string,
    required: PropTypes.bool
};

CheckBox.defaultProps = {
    isDisabled: false,
    required: false,
    value: true,
};

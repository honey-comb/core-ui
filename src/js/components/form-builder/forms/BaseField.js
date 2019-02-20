import React, {Component} from "react";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import FormControl from "@material-ui/core/FormControl/FormControl";

export default class BaseField extends Component {

    /**
     *
     * @returns {*}
     */
    render() {
        return <FormControl margin="normal" required={this.props.required} fullWidth>
            {this.getInput()}
            {this.getAnnotation()}
        </FormControl>
    }

    /**
     * Action when component did mount
     */
    componentDidMount() {

        const valid = this.isValid(true);
        this.props.onChange(this.props.id, this.props.defaultValue, valid, true);
    }

    /**
     * Getting annotation
     *
     * @returns {string}
     */
    getAnnotation() {
        return this.props.annotation ?
            <FormHelperText id="component-helper-text">{this.props.annotation}</FormHelperText> : ''
    }

    /**
     * Default get input, must be overridden by parent
     *
     * @returns {*}
     */
    getInput() {
        return <div/>;
    }

    handleNaturalChange(value) {
        this.naturalChange = true;
        this.props.onChange(this.props.id, value, this.isValid(false, value));
    }

    /**
     * Checking if field value is valid
     *
     * @param isDefault
     * @param value
     * @returns {boolean}
     */
    isValid(isDefault, value) {

        if (!value) {
            value = isDefault ? this.props.defaultValue : this.props.value;
        }

        let isValid = true;

        // When submit is pressed enabling field to pretend it was naturally changed to preserve invalid state
        if (this.props.forceValidation) {
            this.naturalChange = true;
        }

        if (this.props.forceValidation || this.naturalChange || this.props.value || isDefault) {
            if (this.props.required && value === '') {
                isValid = false;
            } else {
                isValid = this.isValueValid(value);
            }
        }

        return isValid;
    }

    /**
     * Checking if actual value is valid, can be overridden by parent component
     *
     * @param value
     * @returns {boolean}
     */
    isValueValid(value) {
        return true;
    }
}

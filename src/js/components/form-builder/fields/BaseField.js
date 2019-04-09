import React, {Component} from "react";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import FormControl from "@material-ui/core/FormControl/FormControl";

export default class BaseField extends Component {

    constructor(props) {
        super(props);

        this.naturalChange = false;
    }

    /**
     *
     * @returns {*}
     */
    render() {

        this.naturalChange = this.props.naturalChange;

        return <FormControl margin="normal" required={this.props.required} fullWidth hidden={this.props.hidden}>
            {this.getInput()}
            {this.getAnnotation()}
        </FormControl>
    }

    /**
     * Action when component did mount
     */
    componentDidMount() {

        this.handleNaturalChange(this.props.defaultValue, true);
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

    handleNaturalChange(value, isDefault) {

        let valid = this.isValid(false, value);

        if (isDefault) {
            valid = this.isValid(isDefault);
            //this.props.onChange(this.props.id, value, valid, true);
        } else {
            this.naturalChange = true;
            //this.props.onChange(this.props.id, value, this.isValid(false, value));
        }

        let data = {
            defaultValue: this.props.defaultValue,
            currentValue: value,
            naturalChange: this.naturalChange,
            isValid: valid,
            hidden: this.props.hidden,
        };

        this.props.onChange(this.props.id, data)
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

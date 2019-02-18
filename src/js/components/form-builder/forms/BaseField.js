import React, {Component} from "react";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import FormControl from "@material-ui/core/FormControl/FormControl";

export default class BaseField extends Component {

    /**
     * Action when component did mount
     */
    componentDidMount() {
        if (this.props.defaultValue !== undefined) {
            this.props.onChange(this.props.id, this.props.defaultValue);
        }
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
     * Default render method
     *
     * @returns {*}
     */
    getDefaultRender() {
        return <FormControl margin="normal" required={this.props.required} fullWidth>
            {this.getInput()}
            {this.getAnnotation()}
        </FormControl>
    }

    /**
     * Default get input, must be overridden by parent
     *
     * @returns {*}
     */
    getInput() {
        return <div/>;
    }
}

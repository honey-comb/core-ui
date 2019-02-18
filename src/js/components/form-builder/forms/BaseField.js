import React, {Component} from "react";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";

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
}

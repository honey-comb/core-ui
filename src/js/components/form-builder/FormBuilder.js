import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import Paper from "@material-ui/core/es/Paper/Paper";
import connect from "react-redux/es/connect/connect";
import {FORM_BUILD, loadForm, removeForm} from "../../actions/form-builder-actions";
import {Configuration} from "../../helpers/Configuration";
import Button from "@material-ui/core/Button/Button";
import {updateFormFieldValue} from "../../actions/form-field-actions";

class FormBuilder extends Component {

    constructor(props) {
        super(props);

        this.createFormFields = this.createFormFields.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * When component is mounted load form configuration
     */
    componentDidMount() {

        this.props.loadForm(this.props.id, this.props.url);
    }

    /**
     * When component is removed delete all traces of the form
     */
    componentWillUnmount() {
        this.props.removeForm(this.props.id);
    }

    /**
     * Main render
     *
     * @returns {*}
     */
    render() {

        switch (this.props.formData.view) {

            case FORM_BUILD:

                return <Paper className={this.props.coreClass}>
                    {this.createFormFields()}
                </Paper>;

            default :
                return <div/>;
        }
    }

    /**
     * Creating form fields
     *
     * @returns {Array}
     */
    createFormFields() {

        let formFields = [];
        const structure = this.props.formData.data.structure;

        Object.keys(structure).map((key, i) => {

            formFields.push(this.getField(this.props.formData.data.structure[key], key, i))
        });

        return formFields;
    }

    /**
     * Creating field from registered fields
     *
     * @param config
     * @param key
     * @param i
     * @returns {*}
     */
    getField(config, key, i) {

        const FieldTagName = Configuration.formFields.get(config.type);
        const value = this.props.formFieldsData ? this.props.formFieldsData[key] : undefined;

        if (!FieldTagName)
            return '';

        return <FieldTagName key={i}
                             id={key}
                             label={config.label}
                             required={config.required}
                             properties={config.properties}
                             annotation={config.annotation}
                             formId={this.props.id}
                             onChange={this.onChange}
                             value={value}
                             defaultValue={config.value}


        />
    }

    /**
     * On field change, update form field value
     *
     * @param id
     * @param value
     */
    onChange(id, value) {

        this.props.updateFormFieldValue(this.props.id, id, value);
    }
}

FormBuilder.propTypes = {
    url: PropTypes.string.isRequired,
    inPopUp: PropTypes.bool,
    coreClass: PropTypes.string,
    id: PropTypes.string.isRequired
};

/**
 * Mapping state to props
 *
 * @param state
 * @param props
 * @returns {{formFieldsData: {}, formData: {}}}
 */
const mapStateToProps = (state, props) => {

    let formState = state.formBuilder[props.id];
    let fieldDataState = state.formFieldsData[props.id];

    return {
        formFieldsData: fieldDataState ? fieldDataState : {},
        formData: formState ? formState : {}
    }
};

/**
 * Mapping actions to props
 *
 * @type {{loadForm: loadForm, removeForm: removeForm, updateFormFieldValue: updateFormFieldValue}}
 */
const mapActionsToProps = {
    loadForm: loadForm,
    removeForm: removeForm,
    updateFormFieldValue: updateFormFieldValue,
};

export default connect(mapStateToProps, mapActionsToProps)(FormBuilder);

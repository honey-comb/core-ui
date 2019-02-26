import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import Paper from "@material-ui/core/es/Paper/Paper";
import connect from "react-redux/es/connect/connect";
import {FORM_BUILD, loadForm, removeForm, resetForm, submitData} from "../../actions/form-builder-actions";
import {Configuration} from "../../helpers/Configuration";
import {updateFormFieldValue} from "../../actions/form-field-actions";
import Buttons from "./builder/Buttons"
import ApiLoader from "../../helpers/ApiLoader";
import Loader from "./builder/Loader";

class FormBuilder extends Component {

    constructor(props) {
        super(props);

        this.createFormFields = this.createFormFields.bind(this);
        this.onChange = this.onChange.bind(this);

        this.formLoader = new ApiLoader();
        this.formDataLoader = new ApiLoader();

        this.state = {
            forceValidation: false,
            isLoading: false
        };
    }

    /**
     * When component is mounted load form configuration
     */
    componentDidMount() {

        this.props.loadForm(this.formLoader, this.props.id, this.props.url, this.props.recordId);
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
     * @returns {Object}
     */
    render() {

        switch (this.props.formConfig.view) {

            case FORM_BUILD:

                return <Paper className={this.props.coreClass + ' form-wrapper'}>
                    <form onSubmit={(e) => {
                        this.handleFormSubmit(e)
                    }}
                          onChange={() => {
                              this.setState({forceValidation: false});
                          }}
                    >
                        {this.createFormFields()}
                        <div className={"form-buttons"}>
                            <Buttons id={this.props.id}
                                     list={this.props.formConfig.data.buttons}
                                     isDisabled={this.state.forceValidation || this.state.isLoading}
                                     onSubmit={(e) => this.handleFormSubmit(e)}
                                     onReset={(e) => this.handleFormReset(e)}
                                     onCancel={(e) => this.handleFormCancel(e)}
                                     onDelete={(e) => this.handleFormDelete(e)}
                            /></div>
                    </form>
                    {this.state.isLoading ? <Loader/> : ''}
                </Paper>;

            default :
                return <div/>;
        }
    }

    /**
     * Handling
     * @param e
     */
    handleFormSubmit(e) {
        e.preventDefault();

        // checking of any fields are not valid
        const validity = Object.filter(this.props.fieldValues, fieldValue => fieldValue.isValid === false);

        // if valid submit data, else validate fields to show user what is missing
        if (Object.keys(validity).length === 0) {

            this.setState({isLoading: true});

            // extracting current values
            let data = {};

            Object.keys(this.props.fieldValues).map((key) => {

                data[key] = this.props.fieldValues[key].currentValue;
            });

            this.props.submitData(this.props.id, this.props.formConfig.data.storageUrl, data, this.props.recordId);

        } else {
            this.setState({forceValidation: true});
        }
    }

    /**
     * Resetting form
     */
    handleFormReset() {
        this.props.resetForm(this.props.id, this.props.fieldValues)
    }

    /**
     *
     */
    handleFormCancel() {
        console.log('Cancel')
    }

    /**
     *
     */
    handleFormDelete() {
        console.log('Delete')
    }


    /**
     * Creating form fields
     *
     * @returns {Array}
     */
    createFormFields() {

        let fieldValues = [];
        const structure = this.props.formConfig.data.structure;

        Object.keys(structure).map((key, i) => {

            fieldValues.push(this.getField(this.props.formConfig.data.structure[key], key, i))
        });

        return fieldValues;
    }

    /**
     * Creating field from registered fields
     *
     * @param fieldConfig
     * @param key
     * @param i
     * @returns {*}
     */
    getField(fieldConfig, key, i) {

        const FieldTagName = Configuration.formFields.get(fieldConfig.type);
        const fieldProps = this.props.fieldValues[key];

        if (!FieldTagName)
            return '';

        return <FieldTagName key={i}
                             id={key}
                             label={fieldConfig.label}
                             required={fieldConfig.required}
                             properties={fieldConfig.properties}
                             annotation={fieldConfig.annotation}
                             value={fieldProps ? fieldProps.currentValue : fieldConfig.value}
                             defaultValue={fieldProps ? fieldProps.defaultValue : fieldConfig.value}
                             naturalChange={fieldProps ? fieldProps.naturalChange : false}
                             forceValidation={this.state.forceValidation}
                             formId={this.props.id}
                             onChange={this.onChange}
                             isDisabled={this.state.isLoading}
        />
    }

    /**
     * On field change, update form field value
     *
     * @param id
     * @param data
     */
    onChange(id, data) {

        this.props.updateFormFieldValue(this.props.id, id, data);
    }
}

FormBuilder.propTypes = {
    url: PropTypes.string.isRequired,
    inPopUp: PropTypes.bool,
    coreClass: PropTypes.string,
    recordId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    id: PropTypes.string.isRequired
};

/**
 * Mapping state to props
 *
 * @param state
 * @param props
 * @returns {{currentFieldValues: {}, formConfig: {}}}
 */
const mapStateToProps = (state, props) => {

    let formConfig = state.formBuilder[props.id];
    let fieldValues = state.fieldValues[props.id];

    return {
        fieldValues: fieldValues ? fieldValues : {},
        formConfig: formConfig ? formConfig : {}
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
    resetForm: resetForm,
    submitData: submitData
};

export default connect(mapStateToProps, mapActionsToProps)(FormBuilder);

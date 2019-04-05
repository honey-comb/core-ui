import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import Paper from "@material-ui/core/es/Paper/Paper";
import connect from "react-redux/es/connect/connect";
import {buildForm, FORM_BUILD, loadForm, removeForm, resetForm, submitData} from "../../actions/form-builder-actions";
import {App} from "../../App";
import {updateFormFieldValue} from "../../actions/form-field-actions";
import Buttons from "./builder/Buttons"
import Loader from "./builder/Loader";
import ApiClient from "../../helpers/ApiClient";

class FormBuilder extends Component {

    constructor(props) {
        super(props);

        this.createFormFields = this.createFormFields.bind(this);
        this.onChange = this.onChange.bind(this);

        this.formLoader = new ApiClient();
        this.formDataLoader = new ApiClient();


        this.state = {
            forceValidation: false,
            isLoading: false
        };
    }

    /**
     * When component is mounted load form configuration
     */
    componentDidMount() {
        if(this.props.formStructure) {
            this.props.buildForm(this.props.id, this.props.formStructure);
        } else {
            this.props.loadForm(this.formLoader, this.props.id, this.props.url, this.props.recordId);
        }
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

                if (this.props.inPopUp) {
                    return <div className={"form-wrapper"} hidden={this.props.isHidden}>
                        {this.getForm()}
                        {this.state.isLoading ? <Loader key={"loader"}/> : ''}
                    </div>
                }

                return <Paper className={this.props.coreClass + ' form-wrapper'} hidden={this.props.isHidden}>
                    {this.getForm()}
                    {this.state.isLoading ? <Loader/> : ''}
                </Paper>;

            default :
                return <div/>;
        }
    }

    getForm() {
        return <form key="form" onSubmit={(e) => {
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

            this.submitData(data);

        } else {
            this.setState({forceValidation: true});
        }
    }

    /**
     * Submitting data to server POST / PUT
     *
     * @param data
     */
    submitData(data) {

        let url = this.props.formConfig.data.storageUrl;

        if (this.props.recordId) {
            url += '/' + this.props.recordId;
        }

        if (this.props.recordId) {
            this.formDataLoader.put(url, data).then((response) => {
                this.props.onSuccess(response.data);

                if (!this.props.keepDisabled) {
                    this.setState({isLoading: false});
                }
            }).catch((e) => {
                this.handleLoaderError(e);
            });
        } else {
            this.formDataLoader.post(url, data).then((response) => {
                this.props.onSuccess(response.data);

                if (!this.props.keepDisabled) {
                    this.setState({isLoading: false});
                }
            }).catch((e) => {
                this.handleLoaderError(e);
            });
        }
    }

    handleLoaderError(data) {
        this.setState({isLoading: false});
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

        const FieldTagName = App.formFields.get(fieldConfig.type);
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
                             hidden={fieldProps ? fieldProps.hidden : fieldConfig.hidden}
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

/**
 *
 * @type {Object}
 */
FormBuilder.propTypes = {
    id: PropTypes.string.isRequired,
    formKey: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired,
    formStructure: PropTypes.object,
    inPopUp: PropTypes.bool,
    isHidden: PropTypes.bool,
    keepDisabled: PropTypes.bool,
    coreClass: PropTypes.string,
    recordId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
};

/**
 * Mapping state to props
 *
 * @param state
 * @param props
 * @returns {Object}
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
 * @type {Object}
 */
const mapActionsToProps = {
    loadForm: loadForm,
    buildForm: buildForm,
    removeForm: removeForm,
    updateFormFieldValue: updateFormFieldValue,
    resetForm: resetForm
};

export default connect(mapStateToProps, mapActionsToProps)(FormBuilder);

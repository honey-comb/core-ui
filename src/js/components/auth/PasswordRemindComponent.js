import FormBuilder from "../form-builder/FormBuilder";
import Grid from "@material-ui/core/Grid/Grid";
import React, {Component} from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import {Typography} from "@material-ui/core";
import {App} from "../../App";

export default class PasswordRemindComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentForm: 'password-remind',
            view: App.config.view.FORM_VIEW,
        };

        this.getForm = this.getForm.bind(this);
        this.remindCompleted = this.remindCompleted.bind(this);
    }

    /**
     * @returns {*}
     */
    render() {

        return <Grid container justify="center" alignContent={"center"} className={"login-wrapper"}>
            <Paper className={'login-form'}>
                {this.getContent()}
            </Paper>
        </Grid>
    }

    /**
     * Creating form
     * @returns {*}
     */
    getForm() {
        return <FormBuilder id={this.state.currentForm}
                            key={this.state.currentForm}
                            formKey={this.state.currentForm}
                            inPopUp={true}
                            coreClass={'login-form'}
                            url={this.props.config.forms[this.state.currentForm]}
                            onSuccess={this.remindCompleted}
        />;
    }

    /**
     * Registration is successful
     * @param data
     */
    remindCompleted(data) {

        this.setState({
            view: App.config.view.SUCCESS_VIEW,
        });
    }

    /**
     *
     * @returns {*}
     */
    getContent() {
        switch (this.state.view) {
            case App.config.view.FORM_VIEW:

                return this.getForm();

            case App.config.view.SUCCESS_VIEW :

                return this.getSuccessView();
        }
    }

    getSuccessView() {
        return <Typography>{App.trans('password.remind_success')}</Typography>
    }
}

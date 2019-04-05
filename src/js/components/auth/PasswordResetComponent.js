import FormBuilder from "../form-builder/FormBuilder";
import Grid from "@material-ui/core/Grid/Grid";
import React, {Component} from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import {App} from "../../App";

export default class PasswordResetComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentForm: 'password-reset'
        };

        this.getForm = this.getForm.bind(this);
        this.resetCompleted = this.resetCompleted.bind(this);
    }

    /**
     * @returns {*}
     */
    render() {

        return <Grid container justify="center" alignContent={"center"} className={"login-wrapper"}>
            <Paper className={'login-form'}>
                {this.getForm()}
            </Paper>
        </Grid>
    }

    /**
     * Creating form
     * @returns {*}
     */
    getForm() {

        const formUrl = this.props.config.forms[this.state.currentForm] + '?token=' + App.request.segment(3);

        return <FormBuilder id={this.state.currentForm}
                            key={this.state.currentForm}
                            formKey={this.state.currentForm}
                            inPopUp={true}
                            coreClass={'login-form'}
                            url={formUrl}
                            onSuccess={this.resetCompleted}
        />;
    }

    /**
     * Registration is successful
     * @param data
     */
    resetCompleted(data) {
        App.services.user.setToken(data.token);
        App.request.redirect('/');
    }
}

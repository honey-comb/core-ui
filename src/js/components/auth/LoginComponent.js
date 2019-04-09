import FormBuilder from "../form-builder/FormBuilder";
import Grid from "@material-ui/core/Grid/Grid";
import React, {Component} from "react";
import Paper from "@material-ui/core/es/Paper/Paper";

import {App} from "../../App";

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentForm: 'login'
        };

        this.getForm = this.getForm.bind(this);
        this.loginCompleted = this.loginCompleted.bind(this);
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
        return <FormBuilder id={this.state.currentForm}
                            key={this.state.currentForm}
                            formKey={this.state.currentForm}
                            inPopUp={true}
                            keepDisabled={true}
                            coreClass={'login-form'}
                            url={this.props.config.forms[this.state.currentForm]}
                            onSuccess={this.loginCompleted}
        />;
    }

    /**
     * Authentication is successful
     * @param data
     */
    loginCompleted(data) {
        App.services.user.setToken(data.token);
        App.request.redirect('/');
    }
}

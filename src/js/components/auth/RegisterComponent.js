import FormBuilder from "../form-builder/FormBuilder";
import Grid from "@material-ui/core/Grid/Grid";
import React, {Component} from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import {Globals} from "../../helpers/Globals";
import {Helpers} from "../../helpers/Helpers";

export default class RegisterComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentForm: 'register'
        };

        this.getForm = this.getForm.bind(this);
        this.registerCompleted = this.registerCompleted.bind(this);
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
                            coreClass={'login-form'}
                            url={this.props.config.forms[this.state.currentForm]}
                            onSuccess={this.registerCompleted}
        />;
    }

    /**
     * Registration is successful
     * @param data
     */
    registerCompleted(data) {

        Globals.config.setAuthConfig(data.token);
        Helpers.navigate('/');
        window.location.reload();
    }
}

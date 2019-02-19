import FormBuilder from "./form-builder/FormBuilder";
import Grid from "@material-ui/core/Grid/Grid";
import React, {Component} from "react";
import {Configuration} from "../helpers/Configuration";

export default class Starter extends Component {

    render() {

        return <Grid container justify="center" alignContent={"center"} className={"login-wrapper"}>
            <FormBuilder url={Configuration.getUrlFromPathConfig('login')}
                         id={'login'}
                         inPopUp={false}
                         coreClass={'login-form'}/>
        </Grid>
    }
}

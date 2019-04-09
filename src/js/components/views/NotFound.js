import React, {Component} from 'react';
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import {App} from "../../App";

export default class NotFound extends Component {


    /**
     * Render component
     *
     * @returns {*}
     */
    render() {

        return <Paper elevation={1}>
            <Typography variant="h5" component="h3">
                {App.trans('error.page_not_found.title', null, 'Page not found')}
            </Typography>
            <Typography component="p">
                {App.trans('error.page_not_found.description')}
            </Typography>
        </Paper>
    }
}

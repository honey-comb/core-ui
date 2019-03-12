import React, {Component} from 'react';
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import {trans} from "../../helpers/Translations";

export default class NotFound extends Component {

    render() {

        return <Paper elevation={1}>
            <Typography variant="h5" component="h3">
                {trans('error.page_not_found.title')}
            </Typography>
            <Typography component="p">
                {trans('error.page_not_found.description')}
            </Typography>
        </Paper>
    }
}

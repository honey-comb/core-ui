import React, {Component} from 'react';
import NotFound from "./NotFound";
import {App} from "../../App";

export class CoreView extends Component {

    render() {
        return this.renderChildView();
    }

    renderChildView() {
        let defKey = this.default ? this.default : 'default';
        const key = App.request.segment(this.props.level, defKey);

        let View = undefined;
        let config = undefined;

        // if no config provided for view, then the child is not found
        if (!this.props.config) {
            View = NotFound;
        } else {

            //if there is no view in configuration, show not found
            if (!this.props.config.views[key]) {
                View = NotFound;
            } else {
                //if no view is specified in the component, show not found
                View = this.routes[key] ? this.routes[key] : NotFound;
                config = this.props.config.views[key];
            }
        }
        return <View level={this.props.level + 1} config={config}/>;
    }
}

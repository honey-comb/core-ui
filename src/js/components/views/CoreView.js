import React, {Component} from 'react';
import NotFound from "./NotFound";

export class CoreView extends Component {

    render() {
        return this.renderChildView();
    }

    renderChildView() {

        // splitting reducers view naming
        const path = window.location.pathname.split('/');
        const key = path[this.props.level] ? path[this.props.level] : this.default ? this.default : 'default';

        let View = this.routes[key];
        let config = undefined;

        if (!View || !this.props.config) {
            View = NotFound;
        } else {
            config = this.props.config.views[key];
        }

        return <View level={this.props.level + 1} config={config} path={path}/>;
    }
}

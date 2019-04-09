import React, {Component} from 'react';

import {App} from "../App";
import NotFound from "../components/NotFound";

export default class CoreView extends Component {


    /**
     * Default view key
     *
     * @returns {string}
     */
    getDefaultRouteKey() {
        return 'default';
    }


    /**
     * Get views
     *
     * @returns {Object}
     */
    getRoutes() {
        return {
            default: NotFound,
        };
    }


    /**
     * Get path segments
     *
     * @returns {Array}
     */
    getSegments() {
        return App.request.segments();
    }


    /**
     * Get route key
     *
     * @returns {string}
     */
    getKey() {
        const path = this.getSegments();

        return path[this.props.level - 1] ? path[this.props.level - 1] : this.getDefaultRouteKey();
    }


    /**
     * Has view
     *
     * @param {string} key
     * @returns {boolean}
     */
    hasView(key) {
        return this.props.config && this.props.config.views && this.props.config.views.hasOwnProperty(key) && this.getRoutes().hasOwnProperty(key);
    }


    /**
     * Get current view
     *
     * @param key
     * @returns {*}
     */
    getView(key) {
        if (this.hasView(key)) {
            return this.getRoutes()[key];
        }

        return NotFound;
    }


    /**
     * Get view config
     *
     * @param {string} key
     * @returns {*}
     */
    getConfig(key) {
        if (this.hasView(key)) {
            return this.props.config.views[key];
        }

        return undefined;
    }


    /**
     * Render child view
     *
     * @returns {*}
     */
    renderChildView() {
        const key = this.getKey();
        const config = this.getConfig(key);
        const View = this.getView(key);

        return <View level={this.props.level + 1} config={config}/>;
    }


    /**
     * Render component
     *
     * @returns {*}
     */
    render() {
        return this.renderChildView();
    }
}
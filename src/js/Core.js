import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Router} from 'react-router';
import {createBrowserHistory} from "history";

import Request from "./helpers/Request";
import Helpers from "./helpers/Helpers";
import Validation from "./helpers/Validation";
import Messages from "./helpers/Messages";
import Trans from "./helpers/Trans";
import ApiClient from "./helpers/ApiClient";
import ComponentsHolder from "./helpers/ComponentsHolder";

import Service from "./services/Service";
import UserService from "./services/UserService";
import ViewService from "./services/ViewService";

import AppConfig from "./config/App";
import AuthConfig from "./config/Auth";
import ViewConfig from "./config/View";

import {FORM_FIELD_LIST} from "./config/Components";

import configureStore from "./MainStore";
import MainView from "./views/MainView";

/**
 * Initializing browser history
 */
export const history = createBrowserHistory();

export default class Core {

    constructor() {

        /**
         * Config services
         *
         * @type {Object.<string, Object>}
         */
        this.config = {
            app: AppConfig,
            auth: AuthConfig,
            view: ViewConfig,
        };

        this.request = new Request();
        this.helpers = new Helpers();
        this.messageBag = new Messages();
        this.validation = new Validation();

        this.trans = (string, args, def) => Trans(string, args, def);

        /**
         * Services
         *
         * @type {Object.<string, Service>}
         */
        this.services = {
            user: new UserService(),
            view: new ViewService(),
        };

        this.formFields = new ComponentsHolder('form-fields');
    }


    /**
     * Init application
     */
    init() {
        this.loadStructure();
        this.registerComponents();
    }


    /**
     * Register components
     */
    registerComponents() {
        this.formFields.registerMany(FORM_FIELD_LIST);
    }


    /**
     * Load structure
     */
    loadStructure() {
        const client = new ApiClient();

        if (this.config.app.API_BASE_URL) {
            client.setBaseUrl(this.config.app.API_BASE_URL);
        }

        client.get(this.config.app.INITIAL_CONFIG_URL)
            .then(response => {
                this.services.view.set(response.data);

                this.render();
            });
    }


    /**
     * Register config
     *
     * @param {string} key
     * @param {Object} config
     */
    registerConfig(key, config) {
        if (!this.config.hasOwnProperty(key) && this.helpers.is_object(config)) {
            this.config[key] = config;
        }
    }


    /**
     * Merge config
     *
     * @param {string} key
     * @param {Object} config
     */
    mergeConfig(key, config) {
        if (this.helpers.is_object(config)) {
            this.config[key] = this.helpers.object_update(config, this.getConfig(key));
        }
    }


    /**
     * Has config service
     *
     * @param {string} key
     * @returns {boolean}
     */
    hasConfig(key) {
        return this.config.hasOwnProperty(key);
    }


    /**
     * Get config service
     *
     * @param {string} key
     * @param {Object} [key=null]
     * @returns {Object}
     */
    getConfig(key, def) {
        if (this.hasConfig(key)) {
            this.config[key];
        }

        return this.helpers.is_object(def) ? def : {};
    }


    /**
     * Register service
     *
     * @param {string} key
     * @param {Service} serviceInstance
     */
    registerService(key, serviceInstance) {
        if (this.helpers.is_instance(serviceInstance, Service)) {
            this.services[key] = serviceInstance;
        }
    }


    /**
     * Render application
     */
    render() {
        const store = configureStore();

        /**
         * Placing Item on stage
         **/
        ReactDOM.render(
            <Provider store={store}>
                <Router history={history}>
                    <Route path={'*'} exact={true} component={MainView}/>
                </Router>
            </Provider>,
            document.getElementById('app')
        );
    }
};

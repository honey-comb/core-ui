import React from 'react';
import {App} from "./js/App";

import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Router} from 'react-router'
import configureStore from "./js/MainStore";
import {createBrowserHistory} from "history";
import HomeView from "./js/components/views/HomeView";
import {FORM_FIELD_LIST} from "./js/config/Components";

/**
 * Initializing browser history
 */
export const history = createBrowserHistory();

/**
 * Registering available form fields
 */
App.formFields.registerMany(FORM_FIELD_LIST);

App.render = function () {
    const store = configureStore();

    /**
     * Placing Item on stage
     **/
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Route path={'*'} exact={true} component={HomeView}/>
            </Router>
        </Provider>,
        document.getElementById('app')
    );
};

App.init();

Object.filter = (obj, predicate) =>
    Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => (res[key] = obj[key], res), {});
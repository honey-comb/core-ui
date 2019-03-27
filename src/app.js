import React from 'react';
import {Globals} from "./js/helpers/Globals";

import SingleLine from "./js/components/form-builder/fields/SingleLine";
import Password from "./js/components/form-builder/fields/Password";
import Email from "./js/components/form-builder/fields/Email";
import CheckBox from "./js/components/form-builder/fields/CheckBox";

import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Router} from 'react-router'
import configureStore from "./js/MainStore";
import {createBrowserHistory} from "history";
import HomeView from "./js/components/views/HomeView";

//TODO find better place for form field register
/**
 * Registering available form fields
 */
Globals.formFields.register('singleLine', SingleLine);
Globals.formFields.register('password', Password);
Globals.formFields.register('email', Email);
Globals.formFields.register('checkBox', CheckBox);

/**
 * Initializing browser history
 */
export const history = createBrowserHistory();

Globals.render = function () {
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

Globals.config.init(document.querySelector('#app').dataset.configUrl);

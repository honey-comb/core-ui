import React from 'react';
import ReactDOM from "react-dom";
import MainView from "./js/MainView";

import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import MainViewReducer from "./js/reducers/main-view-reducer";
import FormReducer from "./js/reducers/form-builder-reducer";
import FieldsReducer from "./js/reducers/fields-reducer";
import thunk from "redux-thunk";

import {Configuration} from "./js/helpers/Configuration";
import SingleLine from "./js/components/form-builder/forms/SingleLine";
import Password from "./js/components/form-builder/forms/Password";
import Email from "./js/components/form-builder/forms/Email";
import CheckBox from "./js/components/form-builder/forms/CheckBox";

/**
 * Registering available form fields
 */
Configuration.formFields.register('singleLine', SingleLine);
Configuration.formFields.register('password', Password);
Configuration.formFields.register('email', Email);
Configuration.formFields.register('checkBox', CheckBox);

/**
 * Registering reducers
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const rootReducer = combineReducers({
    mainView: MainViewReducer,
    formBuilder: FormReducer,
    fieldValues: FieldsReducer
});

/**
 * Registering store enhancers
 */
const allStoreEnhancers = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/**
 * Creating Redux Store
 */
const store = createStore(rootReducer, {}, allStoreEnhancers);

/**
 * Placing Item on stage
 */
ReactDOM.render(
    <Provider store={store}>
        <MainView randomProps={"whatever"} configUrl={document.querySelector('#app').dataset.configUrl}/>
    </Provider>, document.getElementById('app'));

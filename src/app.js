import React from 'react';
import ReactDOM from "react-dom";
import Starter from "./js/MainView";

import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import MainViewReducer from "./js/reducers/main-view-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    mainView: MainViewReducer,
});

const store = createStore(rootReducer, {}, window.devToolsExtension && window.devToolsExtension())
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

ReactDOM.render(<Provider store={store}> <Starter/> </Provider>, document.getElementById('app'));
/**
 * Placing Item on stage
 */
ReactDOM.render(
    <Provider store={store}>
        <MainView randomProps={"whatever"} configUrl={document.querySelector('#app').dataset.configUrl}/>
    </Provider>, document.getElementById('app'));

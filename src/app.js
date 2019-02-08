import React from 'react';
import ReactDOM from "react-dom";
import Starter from "./js/MainView";

import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import MainViewReducer from "./js/reducers/main-view-reducer";

const rootReducer = combineReducers({
    mainView: MainViewReducer,
});

const store = createStore(rootReducer, {}, window.devToolsExtension && window.devToolsExtension())

ReactDOM.render(<Provider store={store}> <Starter/> </Provider>, document.getElementById('app'));

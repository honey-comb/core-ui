import {applyMiddleware, compose, createStore} from 'redux'
import createRootReducer from './MainReducer'
import thunk from "redux-thunk";

let composeData = [];

composeData.push(applyMiddleware(
    thunk
));

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    composeData.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default function configureStore(preloadedState) {
    return createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        compose(...composeData),
    );
}

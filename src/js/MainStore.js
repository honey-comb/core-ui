import { applyMiddleware, compose, createStore } from 'redux'
import createRootReducer from './MainReducer'
import thunk from "redux-thunk";

export default function configureStore(preloadedState) {
    return createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        compose(
            applyMiddleware(
                thunk
            ),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        ),
    );
}

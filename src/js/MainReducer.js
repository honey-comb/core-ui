import { combineReducers } from 'redux'
import FormReducer from "./reducers/form-builder-reducer";
import FieldsReducer from "./reducers/fields-reducer";

export default () => combineReducers({
    formBuilder: FormReducer,
    fieldValues: FieldsReducer,
})

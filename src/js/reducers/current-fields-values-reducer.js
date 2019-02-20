import {FORM_DESTROY, FORM_RESET} from "../actions/form-builder-actions";
import {FORM_UPDATE_FIELD} from "../actions/form-field-actions";

export default function (state = {}, {type, payload}) {

    switch (type) {

        /**
         * Reset form to default values
         */
        case FORM_RESET :

            return {
                ...state,
                [payload.formId]: payload.data
            };

        /**
         * Updating field value in particular form
         */
        case FORM_UPDATE_FIELD :

            return {
                ...state,
                [payload.formId]: {
                    ...state[payload.formId],
                    [payload.key]: payload.value
                }
            };
        /**
         * On form destroy delete saved fields values
         */
        case FORM_DESTROY :

            delete (state[payload.id]);

            return state;

        default :

            return state;
    }
}
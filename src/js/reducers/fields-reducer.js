import {FORM_DESTROY, FORM_RESET} from "../actions/form-builder-actions";
import {FORM_UPDATE_FIELD} from "../actions/form-field-actions";

export default function (state = {}, {type, payload}) {

    switch (type) {

        /**
         * Updating field value in particular form
         */
        case FORM_UPDATE_FIELD :

            if (!state[payload.formId]) {
                state[payload.formId] = {};
            }

            //state[payload.formId][payload.key] = payload.data;

            return {
                ...state,
                [payload.formId]: {
                    ...state[payload.formId],
                    [payload.key]: payload.data
                }
            };

        /**
         * Reset form to default values
         */
        case FORM_RESET :

            let data = payload.data;

            Object.keys(data).map((key) => {
                data[key].currentValue = data[key].defaultValue;
                data[key].naturalChange = false;
            });

            return {
                ...state,
                [payload.formId]: {
                    data
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

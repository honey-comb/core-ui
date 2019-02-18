import {FORM_DESTROY, FORM_UPDATE_FIELD} from "../actions/form-builder-actions";

export default function (state = [], {type, payload}) {

    switch (type) {

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

            delete (state[payload.formId]);

            return state;

        default :

            return state;
    }
}

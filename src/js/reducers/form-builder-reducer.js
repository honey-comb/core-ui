import {FORM_BUILD} from "../actions/form-builder-actions";
import {FORM_DESTROY} from "../actions/form-builder-actions";

export default function (state = [], {type, payload}) {

    switch (type) {

        /**
         * Storing form structure
         */
        case FORM_BUILD :

            return {
                ...state,
                [payload.id]: {
                    data: payload.data,
                    view: type
                }
            };

        /**
         * Deleting form structure
         */
        case FORM_DESTROY :

            delete (state[payload.id]);

            return state;

        default :
            return state;
    }
}

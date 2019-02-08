import {CHANGE_MAIN_VIEW} from "../actions/main-view-actions";

export default function (state = [], {type, payload}) {

    switch (type) {
        case CHANGE_MAIN_VIEW :

            return payload;

        default :
            return state;
    }
}

import axios from "axios";
import {Configuration} from "../helpers/Configuration";

export const CHANGE_MAIN_VIEW = 'main-view:change';
export const VIEW_LOGIN = 'main-view:login';

/**
 * Change main view
 *
 * @param view
 * @returns {{type: string, payload: {view: *}}}
 */
export function changeMainView(view) {
    return {
        type: CHANGE_MAIN_VIEW,
        payload: {
            view: view
        }
    }
}

/**
 * Load Configuration
 *
 * @param url
 * @returns {function(*): Promise<AxiosResponse<any> | never>}
 */
export function loadConfig(url) {

    return dispatch => {

        return axios.get(url)
            .then(({data}) => {

                Configuration.data = data;

                dispatch(changeMainView(VIEW_LOGIN));
            });
    };
}

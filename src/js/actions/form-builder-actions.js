import axios from 'axios';

export const FORM_BUILD = 'form:build';
export const FORM_SHOW = 'form:show';
export const FORM_DESTROY = 'form:destroy';
export const FORM_UPDATE_FIELD = 'form:update-field';
export const FORM_DEFAULT_VALUES = 'form:default-values';

/**
 * Build form
 *
 * @param id
 * @param data
 * @returns {{type: string, hash: number, payload: {id: *, data: *}}}
 */
export function buildForm(id, data) {

    return {
        type: FORM_BUILD,
        payload: {
            id: id,
            data: data
        }
    }
}

/**
 * Remove form from memory
 *
 * @param id
 * @returns {{type: string, payload: {id: *}}}
 */
export function removeForm(id) {
    return {
        type: FORM_DESTROY,
        payload: {
            id: id,
        }
    }
}

/**
 * Load form configuration
 * @param id
 * @param url
 * @returns {function(*): Promise<AxiosResponse<any> | never>}
 */
export function loadForm(id, url) {

    return dispatch => {

        return axios.get(url)
            .then(({data}) => {

                dispatch(buildForm(id, data));
            });
    };
}

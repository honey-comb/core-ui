import axios from 'axios';

export const FORM_BUILD = 'form:build';
export const FORM_DESTROY = 'form:destroy';
export const FORM_RESET = 'form:reset';

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

/**
 * Resetting form fields to default values
 * @param formId
 * @param data
 * @returns {{type: string, payload: {formId: *, data: *}}}
 */
export function resetForm(formId, data)
{
    return {
        type: FORM_RESET,
        payload: {
            formId: formId,
            data: data
        }
    }
}

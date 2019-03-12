import axios from 'axios';

export const FORM_BUILD = 'form:build';
export const FORM_DESTROY = 'form:destroy';
export const FORM_RESET = 'form:reset';

/**
 * Build form
 *
 * @param id
 * @param data
 * @param content
 * @returns {{type: string, hash: number, payload: {id: *, data: *}}}
 */
export function buildForm(id, data, content) {

    return {
        type: FORM_BUILD,
        payload: {
            id: id,
            data: data,
            content: content
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
 * @param loader {ApiLoader}
 * @param id
 * @param url
 * @param recordId
 * @returns {function(*): Promise<AxiosResponse<any> | never>}
 */
export function loadForm(loader, id, url, recordId) {

    return dispatch => {

        return loader.get(url).then(({data}) => {

            dispatch(buildForm(id, data));
        }).catch((error) => {
            //console.log(error);
        })
    };
}

/**
 * Loading form content
 * @param formId
 * @param url
 * @param recordId
 * @returns {function(*): Promise<AxiosResponse<any> | never>}
 */
export function loadFormContent(formId, url, recordId) {
    url += '/' + recordId;

    return dispatch => {

        return axios.get(url)
            .then(({data}) => {

                //console.log(data);
            });
    };
}

/**
 * Resetting form fields to default values
 * @param formId
 * @param data
 * @returns {{type: string, payload: {formId: *, data: *}}}
 */
export function resetForm(formId, data) {
    return {
        type: FORM_RESET,
        payload: {
            formId: formId,
            data: data
        }
    }
}

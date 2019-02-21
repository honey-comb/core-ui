export const FORM_UPDATE_FIELD = 'form-field:update-field';

/**
 * Updating field value on change
 *
 * @param formId
 * @param key
 * @param data
 * @returns {{type: string, payload: {formId: *, data: *}}}
 */
export function updateFormFieldValue(formId, key, data) {
    return {
        type: FORM_UPDATE_FIELD,
        payload: {
            formId: formId,
            key: key,
            data: data
        }
    }
}

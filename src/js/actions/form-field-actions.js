export const FORM_UPDATE_FIELD = 'form:update-field';

/**
 * Updating field value on change
 *
 * @param formId
 * @param key
 * @param value
 * @returns {{type: string, payload: {formId: *, data: *}}}
 */
export function updateFormFieldValue(formId, key, value) {
    return {
        type: FORM_UPDATE_FIELD,
        payload: {
            formId: formId,
            key: key,
            value: value
        }
    }
}


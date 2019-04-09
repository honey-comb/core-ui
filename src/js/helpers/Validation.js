export default class Validation {

    /**
     * Create a new Validation instance.
     */
    constructor() {
        //
    }

    /**
     * Validate email
     *
     * @param {string} value
     * @returns {boolean}
     */
    validateEmail(value) {
        let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{1,10})?$/;

        if (!value || value === "")
            return false;

        return emailReg.test(value);
    }
}
export const uuid = require('uuid/v4');

export const Helpers = {

    /**
     * Components register
     *
     * @param value
     */
    registerElements: function (value) {
        let list = {};
        let _default = value;

        /**
         * Register component
         *
         * @param name
         * @param component
         */
        this.register = function (name, component) {
            list[name] = component;
        };

        /**
         * Get registered component
         *
         * @param name
         * @returns {*}
         */
        this.get = function (name) {

            if (!name)
                name = _default;

            return list[name];
        }
    },

    /**
     * Generate uuid v4
     *
     * @returns {*}
     */
    uuid: function () {
        return uuid();
    },

    /**
     * Validate email address
     *
     * @param value
     * @returns {boolean}
     */
    validateEmail(value) {
        let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{1,10})?$/;

        if (!value || value === "")
            return false;

        return emailReg.test(value);
    }
};

Object.filter = (obj, predicate) =>
    Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => (res[key] = obj[key], res), {} );

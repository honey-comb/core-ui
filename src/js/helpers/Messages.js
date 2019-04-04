import Helpers from './HelpersV2';

class Messages {


    /**
     * Create a new Messages instance.
     */
    constructor() {
        this.messages = {};

        this.helpers = new Helpers();
    }


    /**
     * Determine if an messages exists for the given field.
     *
     * @param {string} field
     */
    has(field) {
        return this.any() && this.messages.hasOwnProperty(field);
    }


    /**
     * Determine if we have any messages.
     */
    any() {
        return Object.keys(this.messages).length > 0;
    }


    /**
     * Retrieve the messages.
     * @returns {object}
     */
    all() {
        let result = {};

        if (this.any()) {
            for (let key in this.messages) {
                if (this.has(key)) {
                    result[key] = this.get(key);
                }
            }
        }
        return result;
    }


    /**
     * Retrieve the message for a field.
     *
     * @param {string} field
     */
    get(field) {
        if (this.has(field)) {
            if (this.helpers.is_array(this.messages[field])) {
                return this.messages[field][0];
            }

            return this.messages[field];
        }
        return null;
    }


    /**
     * Update the message for a field.
     *
     * @param {string} field
     * @param {string} value
     */
    set(field, value) {
        if (this.any() && this.messages.hasOwnProperty(field)) {
            this.add(field, value);
        }
    }


    /**
     * Record the message for a field.
     *
     * @param {string} field
     * @param {string} value
     */
    add(field, value) {
        if (this.helpers.is_string(field)) {
            this.messages[field] = this.helpers.array_wrap(this.helpers.if_null(value));
        }
    }


    /**
     * Record the new messages.
     *
     * @param {object} messages
     */
    record(messages) {
        if (this.helpers.is_object(messages)) {
            this.messages = messages;
        } else {
            this.messages = {};
        }
    }


    /**
     * Clear one or all messages fields.
     *
     * @param {?string} [field=null]
     */
    clear(field) {
        if (!this.helpers.is_null(field) && this.has(field)) {
            this.remove(field);
        } else if (this.helpers.is_null(field)) {
            this.messages = {};
        }
    }


    /**
     *
     * @param {string} field
     */
    remove(field){
        if (this.has(field)) {
            delete this.messages[field];
        }
    }
}

export default Messages;
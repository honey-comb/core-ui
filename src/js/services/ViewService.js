import Service from "./Service";

/**
 * View service
 */
export default class ViewService extends Service {

    /**
     * Create a new ViewService instance.
     */
    constructor() {
        super();

        this.configuration = {};
    };


    /**
     * Set config
     *
     * @param {Object} data
     */
    set(data) {
        this.configuration = data;
    };


    /**
     * Get all config list
     *
     * @returns {Object}
     */
    all() {
        return this.configuration;
    };


    /**
     * Has config
     *
     * @param {string} key
     * @returns {boolean}
     */
    has(key) {
        return this.configuration.hasOwnProperty(key);
    };


    /**
     * Get current config
     *
     * @param {string} key
     * @param {*} [def=null]
     * @returns {*}
     */
    get(key, def) {
        if (this.has(key)) {
            return this.configuration[key];
        }

        return def ? def : null;
    };


    /**
     *
     * @param {string} key
     * @param {*} [def=null]
     * @returns {*}
     */
    getConfig(key, def) {
        if (this.has('config')) {
            let config = this.get('config');

            if (config.hasOwnProperty(key)) {
                return config[key];
            }
        }

        return def ? def : null
    };
}
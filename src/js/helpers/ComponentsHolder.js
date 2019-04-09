export default class ComponentsHolder {

    /**
     * Create a new ComponentHolder instance.
     *
     * @param {string} name
     */
    constructor(name) {
        this.list = {};

        this.name = name;
    }


    /**
     * Register component
     *
     * @param {string} key
     * @param {*} component
     */
    register(key, component) {
        this.list[key] = component;
    };


    /**
     * Register many components
     *
     * @param {Object} list
     */
    registerMany(list) {
        for (let key in list) {
            this.register(key, list[key]);
        }
    };


    /**
     * Get registered component
     *
     * @param {string} key
     * @returns {*}
     */
    get(key) {
        if (!key) {
            key = this.name;
        }

        return this.list[key];
    }
}
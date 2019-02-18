import {Helpers} from "./Helpers";

export let Configuration = {

    /**
     * Application configuration
     */
    data: null,

    /**
     * Get path from configuration path list
     *
     * @param key
     * @returns {*}
     */
    getUrlFromPathConfig(key) {
        return Configuration.data.domain + Configuration.data.version + Configuration.data.pathList[key].path;
    },

    /**
     * Form fields holder
     */
    formFields: new Helpers.registerElements('form-fields')
};

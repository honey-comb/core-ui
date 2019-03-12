import {Helpers} from "./Helpers";
import ApiLoader from "./ApiLoader";

export let Globals = {

    firstPage: false,

    /**
     * Setting default app name
     */
    appName: 'react-app',

    /**
     * Application configuration
     */
    config: new function () {
        let _config = null;
        let loader = new ApiLoader();

        /**
         * Load configuration
         * @param {string} url - configuration path
         */
        this.init = function (url) {

            loader.get(url).then((response) => {
                _config = response.data;
                Globals.render();
            })
        };

        /**
         * Setting auth configuration
         * @param data
         */
        this.setAuthConfig = function (data) {
            localStorage.setItem(Globals.appName + '/token', JSON.stringify(data));
        };

        /**
         *
         * @returns {*}
         */
        this.get = function () {
            return _config;
        };
    },

    user: {},//new User(),

    /**
     * Initial render after configuration loaded
     */
    render: function () {
        alert('Rewrite me: Globals.render()')
    },

    /**
     * Form fields holder
     */
    formFields: new Helpers.registerElements('form-fields'),
};

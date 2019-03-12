import axios from 'axios';
import {Globals} from "./Globals";

export default class ApiLoader {

    /**
     * Initializing loader
     *
     * @param headers
     * @param notify
     */
    constructor(headers, notify) {
        this.source = {};
        this.loading = false;
        this.headers = headers ? headers : {};
        this.notify = notify;
        this.generateCancelToken();
    }

    /**
     * Creating cancel token
     */
    generateCancelToken() {
        let CancelToken = axios.CancelToken;
        this.source = CancelToken.source();
    }


    /**
     * Get method
     *
     * @param url
     * @param params
     * @returns {Promise<any>}
     */
    get(url, params) {
        this.onStart();

        let config = this.getConfig();
        config.params = params;

        return new Promise((resolve, reject) => {
            axios.get(url, config)
                .then(response => {
                    this.onEnd();
                    resolve(response.data);
                })
                .catch(error => {
                    this.onEnd();

                    console.log(error);

                    reject(error.response.data);
                });
        });
    }

    /**
     * Post method
     *
     * @param url
     * @param params
     * @returns {Promise<any>}
     */
    post(url, params) {
        this.onStart();

        let config = this.getConfig();

        return new Promise((resolve, reject) => {
            axios.post(url, params, config)
                .then(response => {
                    this.onEnd();
                    resolve(response.data);
                })
                .catch(error => {
                    this.onEnd();
                    reject(error.response.data);
                });
        });
    }

    /**
     * Put method
     *
     * @param url
     * @param params
     * @returns {Promise<any>}
     */
    put(url, params) {
        this.onStart();

        let config = this.getConfig();

        return new Promise((resolve, reject) => {
            axios.put(url, params, config)
                .then(response => {
                    this.onEnd();
                    resolve(response.data);
                })
                .catch(error => {
                    this.onEnd();
                    reject(error.response.data);
                });
        });
    }

    /**
     * Patch method
     *
     * @param url
     * @param params
     * @returns {Promise<any>}
     */
    patch(url, params) {
        this.onStart();

        let config = this.getConfig();

        return new Promise((resolve, reject) => {
            axios.patch(url, params, config)
                .then(response => {
                    this.onEnd();
                    resolve(response.data);
                })
                .catch(error => {
                    this.onEnd();
                    reject(error.response.data);
                });
        });
    }

    /**
     * Delete method
     *
     * @param url
     * @param params
     * @returns {Promise<any>}
     */
    delete(url, params) {
        this.onStart();

        let config = this.getConfig();
        config.data = params;

        return new Promise((resolve, reject) => {
            axios.delete(url, config)
                .then(response => {
                    this.onEnd();
                    resolve(response.data);
                })
                .catch(error => {
                    this.onEnd();
                    reject(error.response.data);
                });
        });
    }

    /**
     * Start loading
     */
    onStart() {

        this.cancel();
        this.loading = true;
    }

    /**
     * Loading completed
     */
    onEnd() {
        this.loading = false;
    }

    /**
     * Cancel existing loader
     */
    cancel() {

        this.source.cancel('Loader: operation canceled.');
        this.generateCancelToken();
    }

    /**
     * Getting final configuration
     *
     * @returns {{cancelToken: CancelToken}}
     */
    getConfig() {
        return {
            cancelToken: this.source.token,
            headers: this.getAuthToken()
        };
    }

    getAuthToken() {
        const tokenData = JSON.parse(localStorage.getItem(Globals.appName + '/token'));

        if (tokenData) {
            return tokenData.access_token ?
                {'Authorization': 'Bearer ' + tokenData.access_token} :
                undefined;
        }

        return undefined;
    }
}

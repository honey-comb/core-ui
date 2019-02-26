import axios from 'axios';

export default class ApiLoader {

    /**
     * Initializing loader
     *
     * @param headers
     */
    constructor(headers) {
        this.source = {};
        this.loading = false;
        this.headers = headers ? headers : {};
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
                    resolve(response);
                })
                .catch(error => {
                    this.onEnd();
                    reject(error);
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
                    resolve(response);
                })
                .catch(error => {
                    this.onEnd();
                    reject(error);
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
                    resolve(response);
                })
                .catch(error => {
                    this.onEnd();
                    reject(error);
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
                    resolve(response);
                })
                .catch(error => {
                    this.onEnd();
                    reject(error);
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
                    resolve(response);
                })
                .catch(error => {
                    this.onEnd();
                    reject(error);
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
            cancelToken: this.source.token
        };
    }
}

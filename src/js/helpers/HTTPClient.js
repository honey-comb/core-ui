import axios from 'axios';

export default class HTTPClient {

    /**
     * Create a new HTTPClient instance.
     */
    constructor() {
        this.source = {};
        this.config = {};
        this.headers = {};

        this.loading = false;

        this._generateCancelToken();
    }


    /**
     * Get method
     *
     * @param {string} url
     * @param {Object} [params=null]
     * @returns {Promise}
     */
    get(url, params) {
        this.onStart();

        let config = this.getConfig();
        config.params = params ? params : null;

        return new Promise((resolve, reject) => {
            axios.get(url, config)
                .then(response => {
                    this.onEnd();

                    resolve(this.resolveResponse(response));
                })
                .catch(error => {
                    this.onEnd();

                    reject(this.rejectResponse(error));
                });
        });
    }


    /**
     * Post method
     *
     * @param {string} url
     * @param {Object} [params=null]
     * @returns {Promise<any>}
     */
    post(url, params) {
        this.onStart();

        return new Promise((resolve, reject) => {
            axios.post(url, params, this.getConfig())
                .then(response => {
                    this.onEnd();

                    resolve(this.resolveResponse(response));
                })
                .catch(error => {
                    this.onEnd();

                    reject(this.rejectResponse(error));
                });
        });
    }


    /**
     * Put method
     *
     * @param {string} url
     * @param {Object} [params=null]
     * @returns {Promise<any>}
     */
    put(url, params) {
        this.onStart();

        return new Promise((resolve, reject) => {
            axios.put(url, params, this.getConfig())
                .then(response => {
                    this.onEnd();

                    resolve(this.resolveResponse(response));
                })
                .catch(error => {
                    this.onEnd();

                    reject(this.rejectResponse(error));
                });
        });
    }


    /**
     * Patch method
     *
     * @param {string} url
     * @param {Object} [params=null]
     * @returns {Promise<any>}
     */
    patch(url, params) {
        this.onStart();

        return new Promise((resolve, reject) => {
            axios.patch(url, params, this.getConfig())
                .then(response => {
                    this.onEnd();

                    resolve(this.resolveResponse(response));
                })
                .catch(error => {
                    this.onEnd();

                    reject(this.rejectResponse(error));
                });
        });
    }


    /**
     * Delete method
     *
     * @param {string} url
     * @param {Object} [params=null]
     * @returns {Promise<any>}
     */
    delete(url, params) {
        this.onStart();

        let config = this.getConfig();
        config.data = params ? params : null;

        return new Promise((resolve, reject) => {
            axios.delete(url, config)
                .then(response => {
                    this.onEnd();

                    resolve(this.resolveResponse(response));
                })
                .catch(error => {
                    this.onEnd();

                    reject(this.rejectResponse(error));
                });
        });
    }


    /**
     * Resolve response
     *
     * @param {Object} response
     * @returns {Object}
     */
    resolveResponse(response) {
        return response;
    }


    /**
     * Reject response
     *
     * @param {Object} error
     * @returns {Object}
     */
    rejectResponse(error) {
        return error;
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

        this._generateCancelToken();
    }


    /**
     * Getting configuration
     *
     * @returns {Object}
     */
    getConfig() {
        this.setConfig('headers', this.getHeaders());
        this.setConfig('cancelToken', this.source.token);

        return this.config;
    }


    /**
     * Set config
     *
     * @param {string} key
     * @param {*} [value=null]
     */
    setConfig(key, value) {
        this.config[key] = value ? value : null;
    }


    /**
     * Get headers
     *
     * @returns {Object}
     */
    getHeaders() {
        return this.headers;
    }


    /**
     * Set header param value
     *
     * @param {string} key
     * @param {*} value
     */
    setHeader(key, value) {
        this.headers[key] = value;
    }


    /**
     * Set auth token
     *
     * @param {string} token
     */
    setAuthToken(token) {
        this.setHeader('Authorization', token);
    }


    /**
     * Set base url
     *
     * @param {string} baseUrl
     */
    setBaseUrl(baseUrl) {
        this.setConfig('baseURL', baseUrl);
    }


    /**
     * Creating cancel token
     *
     * @private
     */
    _generateCancelToken() {
        let CancelToken = axios.CancelToken;
        this.source = CancelToken.source();
    }
}

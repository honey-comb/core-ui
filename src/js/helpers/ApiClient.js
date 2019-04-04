import HTTPClient from "./HTTPClient";
import UserService from "../services/UserService";

import {API_BASE_URL} from "../config/App";

export default class ApiClient extends HTTPClient {

    /**
     * Initializing Api client
     */
    constructor() {
        super();

        this.userService = new UserService();
    }


    /**
     * Resolve response
     *
     * @param {Object} response
     * @returns {Object}
     */
    resolveResponse(response) {
        if (response.data && response.data.data) {
            return response.data;
        }

        return {};
    }


    /**
     * Reject response
     *
     * @param {Object} error
     * @returns {Object}
     */
    rejectResponse(error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }

        return {};
    }


    /**
     * Getting configuration
     *
     * @returns {Object}
     */
    getConfig() {
        this.setBaseUrl(API_BASE_URL);

        let token = this.userService.getToken();

        if(token) {
            this.setAuthToken('Bearer ' + token.access_token);
        }

        return super.getConfig();
    }
}

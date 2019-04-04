import Service from "./Service";
import {SESSION_TOKEN_NAME} from "../config/Auth";

/**
 * User service
 */
export default class UserService extends Service {

    constructor() {
        super();
    }


    /**
     * Set auth token
     *
     * @param {Object} token
     */
    setToken (token) {
        localStorage.setItem(SESSION_TOKEN_NAME, JSON.stringify(token));
    }


    /**
     *
     * @returns {(Object|null)}
     */
    getToken () {
        return JSON.parse(localStorage.getItem(SESSION_TOKEN_NAME));
    }
}
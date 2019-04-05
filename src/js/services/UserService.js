import Service from "./Service";
import {SESSION_TOKEN_NAME} from "../config/Auth";

/**
 * User service
 */
export default class UserService extends Service {


    /**
     * Create a new UserService instance.
     */
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
    };


    /**
     * Get auth token
     *
     * @returns {(Object|null)}
     */
    getToken () {
        return JSON.parse(localStorage.getItem(SESSION_TOKEN_NAME));
    };


    /**
     * Logout user
     */
    logout () {
        localStorage.removeItem(SESSION_TOKEN_NAME);
    };
}
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
        localStorage.setItem(this.getAuthTokenName(), JSON.stringify(token));
    };


    /**
     * Get auth token
     *
     * @returns {(Object|null)}
     */
    getToken () {
        return JSON.parse(localStorage.getItem(this.getAuthTokenName()));
    };


    /**
     * Logout user
     */
    logout () {
        localStorage.removeItem(this.getAuthTokenName());
    };


    /**
     * Get auth token name
     *
     * @returns {string}
     */
    getAuthTokenName () {
        return SESSION_TOKEN_NAME;
    };
}
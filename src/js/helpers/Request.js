import Helpers from './Helpers';

class Request {

    /**
     * Create a new Request instance.
     */
    constructor() {
        this.request = {};

        this.helpers = new Helpers();
    }


    /**
     *
     * @returns {object}
     */
    all() {
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
            this.request[key] = value;
        });

        return this.request;
    }


    /**
     *
     * @returns {boolean}
     */
    any() {
        return Object.keys(this.all()).length > 0;
    }


    /**
     *
     * @returns {string}
     */
    domain() {
        return document.location.hostname;
    }


    /**
     * Get the root URL for the application.
     *
     * @returns {string}
     */
    root() {
        return document.location.origin;
    }


    /**
     * Get the current path info for the request.
     *
     * @returns {string}
     */
    path() {
        return document.location.pathname;
    }


    /**
     * Get the URL (no query string) for the request.
     *
     * @returns {string}
     */
    url() {
        return this.root() + this.path();
    }


    /**
     * Get the full URL for the request.
     *
     * @returns {string}
     */
    fullUrl() {
        return document.location.href;
    }


    /**
     * Determine if the current request URI matches a pattern.
     *
     * @param {string} patterns
     * @returns {boolean}
     */
    is(patterns) {
        return this.helpers.is_string(patterns) && this.helpers.str_contains(this.url(), patterns);
    }


    /**
     *
     * @param {string} path
     */
    setPath(path) {
        path = this.helpers.if_string(path, '');

        history.replaceState("", "", path);
    }


    /**
     *
     * @param {Object} params
     */
    setRequest(params) {
        params = this.helpers.if_object(params, {});
        let request = this.helpers.http_build_query(params);

        history.replaceState("", "", this.path() + (this.helpers.filled(request) ? '?' : '') + request);
    }


    /**
     *
     * @param {string} key
     * @param {*} [def=null]
     * @returns {*}
     */
    get(key, def) {
        if (this.has(key)) {
            return this.request[key];
        }

        return def !== undefined ? def : null;
    }


    /**
     *
     * @param {string} key
     * @param {*} [def=null]
     * @returns {*}
     */
    input(key, def) {
        return this.get(key, def);
    }


    /**
     *
     * @param {string} key
     * @returns {boolean}
     */
    has(key) {
        let request = this.all();
        return request.hasOwnProperty(key);
    }


    /**
     *
     * @param {string} key
     * @returns {boolean}
     */
    filled(key) {
        return this.helpers.filled(this.get(key));
    }


    /**
     * Get all of the segments for the request path.
     *
     * @returns {string[]}
     */
    segments() {
        return this.helpers.ltrim(this.path(), '/').split('/');
    }

    /**
     * Get a segment from the URI (1 based index).
     *
     * @param  {integer}  $index
     * @param  {(string|null)}  $default
     * @return {(string|null)}
     */
    segment(index, def) {
        def = this.helpers.if_string(def, null);

        return this.helpers.array_get(this.segments(), index - 1, def);
    }


    /**
     * Reload page
     *
     * @param {bool} forcedReload
     */
    reload(forcedReload) {
        document.location.reload(forcedReload ? true : false);
    }


    /**
     *
     * @param {string} path
     */
    redirect(path) {
        if (this.helpers.is_string(path)) {
            document.location.assign(path);
        }
    }
}

export default Request;
import _ from 'lodash';

/**
 *
 * @param {string} string
 * @param {(Object|null)} [args=null]
 * @param {*} [def=null]
 * @returns {*}
 */
export default function (string, args, def) {
    def = (def !== undefined ? def : null);
    let value = _.get(window.i18n, string, def);

    if (Object.prototype.toString.call(string) === '[object String]' && Object.prototype.toString.call(args) === '[object Object]') {
        for (let key in args) {
            value = value.replace(`:${key}`, args[key]);
        }
    }

    return value;
};
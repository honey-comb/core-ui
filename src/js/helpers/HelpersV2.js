export default class HelpersV2 {

    /**
     * @callback arrayCallback
     * @param {*} currentValue The current element being processed in the array.
     * @param {number} [number] The index of the current element being processed in the array.
     * @param {Array} [array] The array filter was called upon.
     */


    /**
     * @callback objectCallback
     * @param {*} value The value of the current element being processed in the object.
     * @param {(string|number)} [key] The key of the current element being processed in the object.
     * @param {number} [number] The index of the current element being processed in the object.
     * @param {Object} [object] The object filter was called upon.
     */

    constructor() {
    }

    /**
     *
     * @param {Object} config
     * @param {string} className
     * @returns {string}
     */
    classes(config, className) {
        let classes = [];

        if (this.is_string(className)) {
            classes.push(className);
        }

        if (this.is_object(config)) {
            this.object_foreach(config, (value, key) => {
                if (value) {
                    classes.push(key);
                }
            });
        }

        return classes.join(' ');
    }


    /**
     * Finds whether a variable is &null;
     *
     * @param  {*} variable
     * @returns {boolean}
     */
    is_null(variable) {
        return variable === undefined || variable === null;
    }


    /**
     * Find whether the type of a variable is string
     *
     * @param  {*} variable
     * @returns {boolean}
     */
    is_string(variable) {
        return Object.prototype.toString.call(variable) === '[object String]';
    }


    /**
     * Finds whether a variable is a number or a numeric string
     *
     * @param  {*} variable
     * @returns {boolean}
     */
    is_number(variable) {
        return Object.prototype.toString.call(variable) === '[object Number]';
    }


    /**
     * Finds whether a variable is an array
     *
     * @param {*} variable
     * @returns {boolean}
     */
    is_array(variable) {
        return Object.prototype.toString.call(variable) === '[object Array]';
    }


    /**
     * Finds whether a variable is an object
     *
     * @param  {*} variable
     * @returns {boolean}
     */
    is_object(variable) {
        return Object.prototype.toString.call(variable) === '[object Object]';
    }


    /**
     * Finds out whether a variable is a boolean
     *
     * @param  {*} variable
     * @returns {boolean}
     */
    is_boolean(variable) {
        return Object.prototype.toString.call(variable) === '[object Boolean]';
    }


    /**
     * Finds whether a variable is an function
     *
     * @param  {*} variable
     * @returns {boolean}
     */
    is_function(variable) {
        return Object.prototype.toString.call(variable) === '[object Function]';
    }


    /**
     * Finds whether a variable is an promise
     *
     * @param  {*} variable
     * @returns {boolean}
     */
    is_promise(variable) {
        return variable instanceof Promise;
    }


    /**
     * Finds whether a variable is an file
     *
     * @param  {*} variable
     * @returns {boolean}
     */
    is_file(variable) {
        return variable instanceof File;
    }


    /**
     *
     * @param {*} variable
     * @returns {boolean}
     */
    is_empty(variable) {
        if (this.is_object(variable) && this.object_length(variable) === 0) {
            return true;
        } else if (this.is_array(variable) && this.array_length(variable) === 0) {
            return true;
        } else if (this.is_string(variable) && this.str_length(variable) === 0) {
            return true;
        } else if (this.is_null(variable)) {
            return true;
        }

        return false;
    }


    /**
     *
     * @param {*} value
     * @param {*} [def]
     * @returns {*}
     */
    if_null(value, def) {
        def = !this.is_null(def) ? def : null;

        return !this.is_null(value) ? value : def;
    }


    /**
     *
     * @param {*} value
     * @param {*} [def]
     * @returns {*}
     */
    if_undefined(value, def) {
        def = !this.is_null(def) ? def : null;

        return value !== undefined ? value : def;
    }


    /**
     *
     * @param {*} value
     * @param {*} [def]
     * @returns {*}
     */
    if_string(value, def) {
        def = !this.is_null(def) ? def : null;

        return this.is_string(value) ? value : def;
    }


    /**
     *
     * @param {*} value
     * @param {*} [def]
     * @returns {*}
     */
    if_number(value, def) {
        def = !this.is_null(def) ? def : null;

        return this.is_number(value) ? value : def;
    }


    /**
     *
     * @param {*} value
     * @param {*} [def]
     * @returns {*}
     */
    if_array(value, def) {
        def = !this.is_null(def) ? def : null;

        return this.is_array(value) ? value : def;
    }


    /**
     *
     * @param {*} value
     * @param {*} [def]
     * @returns {*}
     */
    if_object(value, def) {
        def = !this.is_null(def) ? def : null;

        return this.is_object(value) ? value : def;
    }


    /**
     *
     * @param {*} value
     * @param {*} [def]
     * @returns {*}
     */
    if_boolean(value, def) {
        def = !this.is_null(def) ? def : null;

        return this.is_boolean(value) ? value : def;
    }


    /**
     *
     * @param {*} value
     * @param {*} [def]
     * @returns {*}
     */
    if_empty(value, def) {
        def = this.if_null(def, null);

        return !this.is_empty(value) ? value : def;
    }


    /**
     *
     * @param {number} number
     * @returns {number}
     */
    number_length(number) {
        if (this.is_number(number)) {
            return number.toFixed(0).length;
        }

        return 0;
    }

    /**
     *
     * @param {number} start
     * @param {number} end
     * @param {number} [step=1]
     * @returns {Array}
     */
    range(start, end, step) {
        start = this.if_number(start, 0);
        end = this.if_number(end, 0);

        if (start > end && (this.is_null(step) || step === 0)) {
            step = -1;
        } else if (start < end && (this.is_null(step) || step === 0)) {
            step = 1;
        }

        let array = [start];

        while ((start < end && step > 0) || (start > end && step < 0)) {
            start += step;

            if ((step > 0 && start <= end) || (step < 0 && start >= end)) {
                array.push(start);
            }
        }

        return array;
    }


    /**
     * Determine if the given value is "blank".
     *
     * @param  {*} value
     * @returns {boolean}
     */
    blank(value) {
        if (this.is_null(value)) {
            return true;
        }

        if (this.is_string(value)) {
            return value.trim(value) === '';
        }

        if (this.is_number(value) || this.is_boolean(value)) {
            return false;
        }

        return this.is_empty(value);
    }


    /**
     * Determine if a value is "filled".
     *
     * @param  {*} value
     * @returns {boolean}
     */
    filled(value) {
        return !this.blank(value);
    }


    /**
     *
     * @param {number} value
     * @param {number} precision
     * @returns {*}
     */
    round(value, precision) {
        precision = this.if_number(precision, 0);

        if (this.is_number(value)) {
            return parseFloat(value.toFixed(precision));
        }

        return 0;
    }


    /**
     * Generate a random integer
     *
     * @param {number} [min=0]
     * @param {number} [max=2147483647]
     * @returns {number}
     */
    rand(min, max) {
        min = this.if_number(min, 0);
        max = this.if_number(max, 2147483647);

        return Math.floor(min + Math.random() * (max + 1 - min));
    }


    /**
     *
     * @param {number} min
     * @param {number} max
     * @param {(number|Array.<number>)} except
     * @returns {number}
     */
    rand_except(min, max, except) {
        except = this.array_wrap(except);

        let rand = this.rand(min, max);

        return !this.in_array(rand, except) ? rand : this.rand_except(min, max, except);
    }


    /**
     *
     * @param {(Array|Object)} query
     * @param {string} [prefix=null]
     * @param {string} [separator=null]
     * @returns {string}
     */
    http_build_query(query, prefix, separator) {
        let params = [];
        prefix = this.if_string(prefix, '');
        separator = this.if_string(separator, '&');

        if (this.is_array(query)) {
            query.map((item, index) => {
                if (this.is_array(item)) {
                    params.push(prefix + index + '=' + item.join(','));
                } else if (this.is_string(item)) {
                    params.push(prefix + index + '=' + item);
                }
            })
        } else if (this.is_object(query)) {
            this.object_foreach(query, (value, key) => {
                if (this.is_array(value)) {
                    params.push(key + '=' + value.join(','));
                } else if (this.is_string(value)) {
                    params.push(key + '=' + value);
                }
            });
        }

        return params.join(separator);
    }


    // String


    /**
     * Generate a URL friendly "slug" from a given string.
     *
     * @param  {string} title
     * @param  {string} [separator]
     * @returns {string}
     */
    str_slug(title, separator) {
        if (this.is_string(title)) {
            separator = this.if_string(separator, '-');

            let flip = (separator === '-' ? '_' : '-');
            title = title.replace(new RegExp(flip, 'g'), separator);
            title = title.replace(/ /g, separator);

            title = title.toLowerCase().replace(new RegExp('^[a-z0-9' + separator + ']*$]', 'g'), '');

            return title.replace(new RegExp('[' + separator + '\\s]+', 'g'), separator);
        }

        return '';
    }


    /**
     *
     * @param {string} search
     * @param {*} replace
     * @param {*} subject
     * @returns {string}
     */
    str_replace(search, replace, subject) {
        if (this.is_string(subject)) {
            return subject.replace(search, replace);
        }

        return '';
    }


    /**
     * Determine if a given string contains a given substring.
     *
     * @param  {string} haystack
     * @param  {(string|Array)} needles
     * @returns {boolean}
     */
    str_contains(haystack, needles) {
        if (this.is_string(haystack)) {
            needles = this.array_wrap(needles);

            for (let i = 0; i < needles.length; i++) {
                let element = needles[i];

                if (this.is_string(element) && haystack.indexOf(element) !== -1) {
                    return true;
                }
            }
        }

        return false;
    }


    /**
     * Make a string lowercase
     *
     * @param {string} string
     * @returns {string}
     */
    strtolower(string) {
        if (this.is_string(string)) {
            return string.toLowerCase();
        }

        return '';
    }


    /**
     * Make a string uppercase
     *
     * @param {string} string
     * @returns {string}
     */
    strtoupper(string) {
        if (this.is_string(string)) {
            return string.toUpperCase();
        }

        return '';
    }


    /**
     * Make a string's first character uppercase
     *
     * @param {string} string
     * @returns {string}
     */
    ucfirst(string) {
        if (this.is_string(string)) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        return '';
    }


    /**
     * Limit the number of characters in a string.
     *
     * @param  {string} value
     * @param  {number} [limit=100]
     * @param  {string} [end=...]
     * @returns {string}
     */
    str_limit(value, limit, end) {
        end = this.if_string(end, '...');
        limit = this.if_number(limit, 100);

        if (this.is_string(value) && limit > 0) {
            return (value.length > limit) ? value.substr(0, limit) + end : value;
        }

        return '';
    }


    /**
     * Get string length
     *
     * @param {string} value
     * @returns {number}
     */
    str_length(value) {
        return this.is_string(value) ? value.length : 0;
    }


    /**
     * Determine if a given string starts with a given substring.
     *
     * @param  {string} haystack
     * @param  {(string|Array)} needles
     * @returns {boolean}
     */
    starts_with(haystack, needles) {
        needles = this.array_wrap(needles);

        if (this.is_string(haystack)) {
            for (let i = 0; i < needles.length; i++) {
                let element = needles[i];

                if (this.is_string(element) && haystack.substr(0, element.length) === element) {
                    return true;
                }
            }
        }

        return false;
    }


    /**
     * Determine if a given string ends with a given substring.
     *
     * @param  {string} haystack
     * @param  {(string|Array)} needles
     * @returns {boolean}
     */
    ends_with(haystack, needles) {
        needles = this.array_wrap(needles);

        if (this.is_string(haystack)) {
            for (let i = 0; i < needles.length; i++) {
                let element = needles[i];

                if (this.is_string(element) && haystack.substr(haystack.length - element.length) === element) {
                    return true;
                }
            }
        }

        return false;
    }


    /**
     *
     * @param {string} str
     * @param {string} splitter
     * @returns {Array}
     */
    str_split(str, splitter) {
        if (this.is_string(str)) {
            splitter = this.if_string(splitter, '');

            return str.split(splitter);
        }

        return [];
    }


    /**
     * Randomly shuffles a string
     *
     * @param {string} str
     * @returns {string}
     */
    str_shuffle(str) {
        if (this.is_string(str)) {
            return str.split('').sort(function () {
                return Math.random() - Math.random();
            }).join('');
        }
        return '';
    }


    /**
     * Generate a more truly "random" alpha-numeric string.
     *
     * @param  {number} [length=16]
     * @param  {string} [charSet]
     * @returns {string}
     */
    str_random(length, charSet) {
        length = this.if_number(length, 16);
        charSet = this.if_string(charSet, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

        return this.str_shuffle(charSet).substr(0, length);
    }


    /**
     * Begin a string with a single instance of a given value.
     *
     * @param  {string} value
     * @param  {string} prefix
     * @returns {string}
     */
    str_start(value, prefix) {
        if (this.is_string(value) && !this.starts_with(value, prefix)) {
            value = prefix + value;
        }
        return this.if_string(value, '');
    }


    /**
     * Cap a string with a single instance of a given value.
     *
     * @param  {string} value
     * @param  {string} cap
     * @returns {string}
     */
    str_finish(value, cap) {
        if (this.is_string(value) && !this.ends_with(value, cap)) {
            value = value + cap;
        }
        return this.if_string(value, '');
    }


    /**
     * Return the remainder of a string after a given value.
     *
     * @param  {string} subject
     * @param  {string} search
     * @returns {string}
     */
    str_after(subject, search) {
        if (this.is_string(subject) && this.is_string(search)) {
            return subject.split(search, 2).reverse()[0];
        }
        return this.if_string(subject, '');
    }


    /**
     * Get the portion of a string before a given value.
     *
     * @param  {string} subject
     * @param  {string} search
     * @returns {string}
     */
    str_before(subject, search) {
        if (this.is_string(subject) && this.is_string(search)) {
            return subject.split(search)[0];
        }
        return this.if_string(subject, '');
    }


    /**
     * Convert a value to title case.
     *
     * @param  {string}  value
     * @returns {string}
     */
    title_case(value) {
        if (this.is_string(value)) {
            return this.array_map(value.split(' '), (element) => {
                return this.ucfirst(element);
            }).join(' ');
        }

        return '';
    }


    /**
     *
     * @param {string} value
     * @param {string} charlist
     * @returns {string}
     */
    trim(value, charlist) {
        charlist = this.if_string(charlist, ' \t\n\r\0\x0B');

        if (this.is_string(value)) {
            return value.replace(new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g'), '');
        }

        return '';
    }


    /**
     *
     * @param {string} value
     * @param {string} charlist
     * @returns {string}
     */
    ltrim(value, charlist) {
        charlist = this.if_string(charlist, ' \t\n\r\0\x0B');

        if (this.is_string(value)) {
            return value.replace(new RegExp('^[' + charlist + ']+', 'g'), '');
        }

        return '';
    }


    /**
     *
     * @param {string} value
     * @param {string} charlist
     * @returns {string}
     */
    rtrim(value, charlist) {
        charlist = this.if_string(charlist, ' \t\n\r\0\x0B');

        if (this.is_string(value)) {
            return value.replace(new RegExp('[' + charlist + ']+$', 'g'), '');
        }

        return '';
    }


    // Array


    /**
     * Checks if a value exists in an array
     *
     * @param {*} needle
     * @param {Array} haystack
     * @returns {boolean}
     */
    in_array(needle, haystack) {
        return this.is_array(haystack) ? (haystack.indexOf(needle) !== -1) : false;
    }


    /**
     *
     * @param {string} delimiter
     * @param {string} string
     * @returns {Array}
     */
    explode(delimiter, string) {
        delimiter = this.if_string(delimiter, '');

        if (this.is_string(string) && string.length > 0) {
            return string.split(delimiter);
        }

        return [];
    }

    /**
     *
     * @param {string} delimiter
     * @param {Array} array
     * @returns {string}
     */
    implode(delimiter, array) {
        delimiter = this.if_string(delimiter, '');

        if (this.is_array(array)) {
            return array.join(delimiter);
        }

        return '';
    }


    /**
     * If the given value is not an array, wrap it in one.
     *
     * @param  {*} value
     * @returns {Array}
     */
    array_wrap(value) {
        if (this.is_null(value)) {
            return [];
        }
        return !this.is_array(value) ? [value] : value;
    }


    /**
     * Get the first element of an array. Useful for method chaining.
     *
     * @param {Array} array
     * @returns {*}
     */
    array_head(array) {
        if (this.is_array(array) && array.length > 0) {
            return array[0];
        }

        return null;
    }


    /**
     * Add an element to an array.
     *
     * @param  {Array} array
     * @param  {*} value
     * @returns {Array}
     */
    array_push(array, value) {
        if (this.is_array(array)) {
            array.push(value);

            return array;
        }

        return [];
    }


    /**
     * Push an item onto the beginning of an array.
     *
     * @param  {Array} array
     * @param  {...*} value
     * @returns {Array}
     */
    array_prepend(array, ...value) {
        if (this.is_array(array)) {
            array.unshift(value);

            return array;
        }

        return [];
    }


    /**
     * Shift an element off the beginning of array
     *
     * @param {Array} array
     * @returns {*}
     */
    array_shift(array) {
        if (this.is_array(array)) {
            return array.shift();
        }

        return null;
    }


    /**
     * Pop the element off the end of array
     *
     * @param {Array} array
     * @returns {*}
     */
    array_pop(array) {
        if (this.is_array(array)) {
            return array.pop();
        }

        return null;
    }


    /**
     * Get an item from an array using "dot" notation.
     *
     * @param  {Array} array
     * @param  {(string|int)} key
     * @param  {*} [def]
     * @returns {*}
     */
    array_get(array, key, def) {
        def = this.if_null(def);

        if (this.is_array(array)) {
            return this.if_null(array[key], def);
        }

        return def;
    }


    /**
     * Add an element to an array.
     *
     * @param  {Array} array
     * @param  {number} key
     * @param  {*} value
     * @returns {Array}
     */
    array_add(array, key, value) {
        if (this.is_array(array) && !this.is_null(key)) {
            array[key] = this.if_null(value);

            return array;
        }

        return [];
    }


    /**
     * Set an array item to a given value using "dot" notation.
     *
     * If no key is given to the method, the entire array will be replaced.
     *
     * @param  {Array} array
     * @param  {(string|int)} key
     * @param  {*} value
     * @returns {Array}
     */
    array_set(array, key, value) {
        if (this.is_array(array)) {
            if (!this.is_null(array[key])) {
                array = this.array_add(array, key, value);
            }

            return array;
        }

        return [];
    }


    /**
     * Delete array element by value
     *
     * @param {Array} array
     * @param {*} value
     * @returns {Array}
     */
    array_remove(array, value) {
        if (this.is_array(array)) {
            value = this.array_wrap(value);

            return array.filter((record) => {
                return !this.in_array(record, value);
            });
        }
        return [];
    }


    /**
     * Counts all elements in an array.
     *
     * @param {Array} array.
     * @returns {number}
     */
    array_length(array) {
        if (this.is_array(array)) {
            return array.length;
        }

        return 0;
    }


    /**
     * Move array element 'from' position 'to' position
     *
     * @param {Array} array
     * @param {number} from
     * @param {number} to
     * @returns {Array}
     */
    array_move(array, from, to) {
        if (this.is_array(array) && to !== from) {
            if (from > -1 && from < array.length) {
                if (to >= array.length) {
                    to = array.length - 1;
                }
                array.splice(to, 0, array.splice(from, 1)[0]);
            }

            return array;
        }

        return [];
    }


    /**
     * Check if an item or items exist in an array using "dot" notation.
     *
     * @param  {Array} array
     * @param  {(string|Array|number)} keys
     * @param  {boolean} [force]
     * @returns {boolean}
     */
    array_has(array, keys, force) {
        if (!this.is_array(array)) {
            return false;
        }

        keys = this.array_wrap(keys);

        if (array.length === 0 || keys.length === 0) {
            return false;
        }

        force = this.if_boolean(force, false);

        let match = keys.filter((key) => {
            return this.in_array(key, array) || !this.is_null(array[key]);
        }).length;

        return (force && match === keys.length) || (!force && match > 0);
    }


    /**
     *
     * @param {Array} array
     * @param {(string|number)} needle
     * @returns {(number|null)}
     */
    array_position(array, needle) {
        if (this.is_array(array)) {
            return array.indexOf(needle);
        }

        return null;
    }


    /**
     * Toggle array item
     *
     * @param {Array} array
     * @param {*} value
     * @returns {Array}
     */
    array_toggle(array, value) {
        if (this.is_array(array)) {
            let index = array.indexOf(value);

            if (index !== -1) {
                array.splice(index, 1);
            } else {
                array.push(value);
            }

            return array;
        }

        return [];
    }


    /**
     * Filter the array using the given callback.
     *
     * @param  {Array} array
     * @param  {arrayCallback} callback
     * @returns {Array}
     */
    array_where(array, callback) {
        if (this.is_array(array) && this.is_function(callback)) {
            return array.filter(callback);
        } else if (this.is_array(array)) {
            return array;
        }

        return [];
    }

    /**
     * Applies the callback to the elements of the given arrays
     *
     * @param  {Array} array
     * @param  {arrayCallback} callback
     * @returns {Array}
     */
    array_map(array, callback) {
        if (this.is_array(array) && this.is_function(callback)) {
            return array.map(callback);
        }

        return [];
    }


    /**
     * The method executes a provided function once for each array element.
     *
     * @param  {Array} array
     * @param  {arrayCallback} callback
     */
    array_foreach(array, callback) {
        if (this.is_array(array) && this.is_function(callback)) {
            for (let i = 0; i < array.length; i++) {
                callback(array[i], i, array);
            }
        }
    }


    /**
     * Return the first element in an array passing a given truth test.
     *
     * @param  {Array} array
     * @param  {arrayCallback} callback
     * @param  {*} [def]
     * @returns {*}
     */
    array_first(array, callback, def) {
        def = this.if_null(def);

        let filtered = this.array_where(array, callback);

        if (filtered.length > 0) {
            return filtered[0];
        }

        return def;
    }


    /**
     *
     * @param {Array} array
     * @param {...*} merge
     * @returns {Array}
     */
    array_merge(array, ...merge) {
        if (this.is_array(array)) {
            return array.concat(merge);
        }

        return [];
    }


    /**
     * Collapse an array of arrays into a single array.
     *
     * @param  {Array} array
     * @returns {Array}
     */
    array_collapse(array) {
        let results = [];

        this.array_foreach(array, (record) => {
            results = results.concat(record);
        });

        return results;
    }


    /**
     * Get a subset of the items from the given array.
     *
     * @param  {Array} array
     * @param  {(Array|string)} keys
     * @returns {Array}
     */
    array_only(array, keys) {
        if (this.is_array(array)) {
            keys = this.array_wrap(keys);

            return array.filter((record) => {
                return this.in_array(record, keys);
            });

        }
        return [];
    }


    /**
     * Get all of the given array except for a specified array of keys.
     *
     * @param  {Array} array
     * @param  {(Array|string|number)} keys
     * @returns {Array}
     */
    array_except(array, keys) {
        if (this.is_array(array)) {
            keys = this.array_wrap(keys);

            return array.filter((record) => {
                return !this.in_array(record, keys);
            });
        }
        return [];
    }


    /**
     * Split an array into chunks
     * @param {Array} array
     * @param {number} size
     * @returns {Array}
     */
    array_chunk(array, size) {
        if (this.is_array(array)) {
            let results = [];
            size = this.if_null(size) ? size : array.length;

            for (let i = 0; i < array.length; i += size) {
                results.push(array.slice(i, i + size));
            }

            return results;
        }

        return [];
    }


    /**
     * Clone array
     *
     * @param {Array} array
     * @returns {Array}
     */
    array_clone(array) {
        if (this.is_array(array)) {
            let results = [];

            this.array_foreach(array, (record) => {
                results.push(this.clone(record));
            });

            return results;
        }

        return [];
    }


    /**
     * Comparison two arrays
     *
     * @param {Array} array1
     * @param {Array} array2
     * @returns {boolean}
     */
    array_equals(array1, array2) {
        if (!this.is_array(array1) || !this.is_array(array2)) {
            return false;
        }

        if (array1.length !== array2.length) {
            return false;
        }

        let notEquals = 0;

        this.array_foreach(array1, (value, i) => {
            if (this.is_null(array2[i]) || typeof value !== typeof array2[i]) {
                notEquals += 1;
            } else if (!this.equals(value, array2[i])) {
                notEquals += 1;
            }
        });

        return notEquals === 0;
    }


    // Object


    /**
     *
     * @param {Object} object
     * @returns {Array}
     */
    object_keys(object) {
        if (this.is_object(object)) {
            return Object.keys(object);
        }

        return [];
    }


    /**
     *
     * @param {Object} object
     * @returns {number}
     */
    object_length(object) {
        if (this.is_object(object)) {
            return Object.keys(object).length;
        }

        return 0;
    }

    /**
     *
     * @param {Object} object
     * @param {string} key
     * @param {*} [def=null]
     * @returns {*}
     */
    object_get(object, key, def) {
        if (self.is_object(object) && object.hasOwnProperty(key)) {
            return object[key];
        }

        return !self.is_null(def) ? def : null;
    };


    /**
     *
     * @param {Object} object
     * @returns {*}
     */
    object_head(object) {
        if (this.object_length(object) > 0) {
            return object[Object.keys(object)[0]];
        }

        return null;
    }


    /**
     *
     * @param {Object} object1
     * @param {Object} object2
     * @returns {Object}
     */
    object_merge(object1, object2) {
        if (this.is_object(object1) && this.is_object(object2)) {
            let results = {};

            for (let key in object1) {
                results[key] = object1[key];
            }

            for (let key in object2) {
                results[key] = object2[key];
            }

            return results;

        } else if (this.is_object(object1)) {
            return object1;
        } else if (this.is_object(object2)) {
            return object2;
        }

        return {};
    }

    /**
     *
     * @param  {Object} object
     * @param  {(string|Array|number)} keys
     * @param  {boolean} [force]
     * @returns {boolean}
     */
    object_has(object, keys, force) {
        if (this.object_length(object) === 0) {
            return false;
        }

        keys = this.array_wrap(keys);

        if (keys.length === 0) {
            return false;
        }

        force = this.if_boolean(force, false);

        let filtered = this.object_where(object, (value, key) => {
            return this.in_array(key, keys);
        });

        let match = this.object_length(filtered);

        return (force && match === keys.length) || (!force && match > 0);
    }


    /**
     * The method executes a provided function once for each object element.
     *
     * @param  {Object} object
     * @param  {objectCallback} callback
     */
    object_foreach(object, callback) {
        if (this.is_object(object) && this.is_function(callback)) {
            let index = 0;

            for (let key in object) {
                callback(object[key], key, index, object);
                index += 1;
            }
        }
    }


    /**
     *
     * @param {Object} object
     * @param {objectCallback} callback
     * @returns {Object}
     */
    object_where(object, callback) {
        if (this.is_object(object)) {
            let newObject = {};

            this.object_foreach(object, (value, key, index) => {
                let results = callback(value, key, index, object);

                if (this.is_boolean(results) && results) {
                    newObject[key] = value;
                }
            });

            return newObject;
        }

        return {};
    }


    /**
     *
     * @param {Object} object
     * @param {objectCallback} callback
     * @param  {*} [def]
     * @returns {*}
     */
    object_first(object, callback, def) {
        def = this.if_null(def);

        if (this.is_object(object)) {
            let index = 0;

            for (let key in object) {
                let value = object[key];

                if (callback(value, key, index, object)) {
                    return value;
                }

                index++;
            }
        }

        return def;
    }


    /**
     * Get a subset of the items from the given object.
     *
     * @param  {Object} object
     * @param  {(Array|string|number)} keys
     * @returns {Object}
     */
    object_only(object, keys) {
        keys = this.array_wrap(keys);

        return this.object_where(object, (value, key) => {
            return this.in_array(key, keys);
        });
    }


    /**
     * Get all of the given object except for a specified array of keys.
     *
     * @param  {Object} object
     * @param  {(Array|string|number)} keys
     * @returns {Object}
     */
    object_except(object, keys) {
        keys = this.array_wrap(keys);

        return this.object_where(object, (value, key) => {
            return !this.in_array(key, keys);
        });
    }


    /**
     *
     * @param {Object} object
     * @param {objectCallback} callback
     * @returns {Object}
     */
    object_map(object, callback) {
        if (this.is_object(object)) {
            let newObject = {};
            this.object_foreach(object, (value, key, index) => {
                let results = callback(value, key, index, object);

                if (!this.is_null(results)) {
                    newObject[key] = results;
                }
            });

            return newObject;
        }

        return {};
    }


    /**
     *
     * @param {Object} object
     * @param {objectCallback} callback
     * @returns {Object}
     */
    object_mapWithKey(object, callback) {
        if (this.is_object(object)) {
            let newObject = {};
            this.object_foreach(object, (value, key, index) => {
                let results = callback(value, key, index, object);

                if (this.is_array(results) && results.length === 2 && this.is_string(results[0])) {
                    newObject[results[0]] = results[1];
                } else {
                    newObject[key] = results;
                }
            });

            return newObject;
        }

        return {};
    }


    /**
     *
     * @param {Object} object
     * @returns {Object}
     */
    object_clone(object) {
        if (this.is_object(object)) {
            let results = {};

            this.object_foreach(object, (record, key) => {
                results[key] = this.clone(record);
            });

            return results;
        }

        return {};
    }


    /**
     *
     * @param {Object} object1
     * @param {Object} object2
     * @returns {boolean}
     */
    object_equals(object1, object2) {
        if (!this.is_object(object1) || !this.is_object(object2)) {
            return false;
        }

        if (this.object_length(object1) !== this.object_length(object2)) {
            return false;
        }

        let notEquals = 0;

        this.object_foreach(object1, (value, key) => {
            if (!object2.hasOwnProperty(key) || typeof value !== typeof object2[key]) {
                notEquals += 1;
            }
        });

        this.object_foreach(object2, (value, key) => {
            if (!object1.hasOwnProperty(key) || typeof value !== typeof object1[key]) {
                notEquals += 1;
            } else if (!this.equals(value, object1[key])) {
                notEquals += 1;
            }
        });

        return notEquals === 0;
    }

    /**
     *
     * @param {Object} object
     * @param {object} data
     * @returns {Object}
     */
    object_update(object, data) {
        object = this.is_object(object) ? object : {};

        if (this.is_object(data)) {
            Object.keys(data).map((key) => {
                object[key] = data[key];
            })
        }

        return object;
    }


    /**
     * Clone element
     *
     * @param {*} element
     * @returns {*}
     */
    clone(element) {
        if (this.is_array(element)) {
            return this.array_clone(element);
        } else if (this.is_object(element)) {
            return this.object_clone(element);
        }

        return element;
    }


    /**
     * Compare two elements are equals
     *
     * @param {*} item1
     * @param {*} item2
     * @returns {boolean}
     */
    equals(item1, item2) {
        if (this.is_object(item1) && this.is_object(item2)) {
            return this.object_equals(item1, item2);
        } else if (this.is_array(item1) && this.is_array(item2)) {
            return this.array_equals(item1, item2);
        } else if (typeof item1 === typeof item2 && item1 === item2) {
            return true;
        }

        return false;
    }


    /**
     *
     * @param {Array.<Object>} array
     * @param {string} value
     * @param {string} key
     * @returns {(Array|Object)}
     */
    pluck(array, value, key) {
        if (this.is_array(array)) {
            let results = this.is_null(key) ? [] : {};

            this.array_foreach(array, (object) => {
                if (this.is_object(object) && object.hasOwnProperty(value)) {
                    if (this.is_null(key)) {
                        results.push(object[value]);
                    } else if (!this.is_null(key) && object.hasOwnProperty(key)) {
                        results[object[key]] = object[value];
                    }
                }
            });

            return results;
        }

        return [];
    }
};
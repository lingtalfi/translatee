/**
 *
 * Plural/non-plural
 * --------------
 * Translatee distinguishes two types of strings:
 *
 * - non-plural string (which doesn't involve a plural)
 * - plural string (which involves a plural)
 *
 * The _ method fetches non-plural translations.
 * The _n method fetches plural translations.
 *
 *
 * Plural selector and dictionary structure
 * ---------------
 * The **plural selector** is a function that returns a plural index.
 * The plural index indicates which translation (in the dictionary) to choose from when a plural form is required.
 *
 * The dictionary is a map of msgId to array of translations.
 * In singular string (aka non-plural string), the array contains only one translation.
 * In plural strings, the array contains more than one translation, depending on the language,
 * and the **plural selector** function returns the index of the translation to return.
 * The order of the translation depends on the person who creates the dictionary.
 *
 * In translatee, the plural selector function is always bound to a dictionary.
 *
 *
 *
 * Strict mode
 * -----------
 * With strict mode on, all errors throw an exception.
 * With strict mode off, the translation methods always return the msg id if there is an error.
 *
 *
 */
class Translatee {

    constructor() {
        this.dictionaries = {};
        this.pluralSelectors = {};
        this.defaultLang = 'eng';
        this.strictMode = true;
    }

    setDefaultLang(langId) {
        this.defaultLang = langId;
    }

    setStrictMode(bool) {
        this.strictMode = bool;
    }

    addDictionary(langId, dictionary, pluralSelector = null) {
        if (null === pluralSelector) {
            pluralSelector = this._getDefaultPluralSelector(langId);
        }
        this.pluralSelectors[langId] = pluralSelector;
        this.dictionaries[langId] = dictionary;
    }


    /**
     * Fetches a non-plural translation.
     * Tags are automatically wrapped with the curly bracket and will replace their dictionary string counterpart if found.
     * If langId is null, the default lang will be used.
     */
    _(msgId, tags = {}, langId = null) {
        if (null === langId) {
            langId = this.defaultLang;
        }
        if (langId in this.dictionaries) {

            var dict = this.dictionaries[langId];
            if (msgId in dict) {
                var msg = dict[msgId][0];
                for (var key in tags) {
                    msg = msg.replace('{' + key + '}', tags[key]);
                }
                return msg;
            } else {
                if (true === this.strictMode) {
                    this._error(`Message not found with id = ${msgId} and langId = ${langId}.`);
                }
                return msgId;
            }
        } else {
            if (true === this.strictMode) {
                this._error(`Dictionary not loaded with langId = ${langId}.`);
            }
            return msgId;
        }
    }


    /**
     * Fetches a plural translation.
     * Tags are automatically wrapped with the curly bracket and will replace their dictionary string counterpart if found.
     * If langId is null, the default lang will be used.
     *
     * The special tag {x} is used to replace the number in the translation.
     */
    _n(msgId, number, tags = {}, langId = null) {
        if (null === langId) {
            langId = this.defaultLang;
        }
        if (langId in this.dictionaries) {

            var dict = this.dictionaries[langId];
            if (msgId in dict) {

                var pluralSelector = this.pluralSelectors[langId];
                var pluralIndex = pluralSelector(number);
                var messages = dict[msgId];
                if (pluralIndex < messages.length) {
                    var msg = dict[msgId][pluralIndex];
                    for (var key in tags) {
                        msg = msg.replace('{' + key + '}', tags[key]);
                    }
                    msg = msg.replace('{x}', number);
                    return msg;
                } else {
                    if (true === this.strictMode) {
                        this._error(`Plural form not found with id = ${msgId}, pluralIndex=${pluralIndex} and langId = ${langId}.`);
                    }
                    return msgId;
                }

            } else {
                if (true === this.strictMode) {
                    this._error(`Message not found with id = ${msgId} and langId = ${langId}.`);
                }
                return msgId;
            }
        } else {
            if (true === this.strictMode) {
                this._error(`Dictionary not loaded with langId = ${langId}.`);
            }
            return msgId;
        }
    }


    //----------------------------------------
    // PRIVATE STUFF
    //----------------------------------------
    _error(msg) {
        throw new Error("Translatee error: " + msg);
    }

    _getDefaultPluralSelector(langId) {
        switch (langId) {
            case 'en':
            case 'eng':
            case 'fr':
            case 'fra':
            default:

                return function (n) {
                    if (1 === n) {
                        return 0;
                    }
                    return 1;
                };
        }
    }
}


module.exports = Translatee;

Translatee
============
2020-04-02


A simple and flexible translate function for js.



Install
--------

```js 
npm install translatee
```



Example
=========

```js
const Translatee = require('translatee');

/**
 * Notice that for my personal tastes in french/english, I use only two plural forms: the singular form if n=1,
 * and the plural form if n=0 or n>1. The cool thing with translatee is that we can create our own plural rules,
 * and so for instance another person might prefer to have three plural forms: one for 0, one for 1, and one for >1 for instance.
 *
 */
var dictionaryFR = {
    'hello': [
        'bonjour',
    ],
    'hello you': [
        'bonjour {name}',
    ],
    'I have x cats': [
        "J'ai 1 chat",
        "J'ai {x} chats",
    ],
};

var dictionaryEN = {
    'hello': [
        'hello',
    ],
    'hello you': [
        'hello {name}',
    ],
    'I have x cats': [
        "I have 1 cat",
        "I have {x} cats",
    ],
};


//----------------------------------------
// SETUP
//----------------------------------------
var translatee = new Translatee();
/**
 * Note: this is the default plural rule in translatee if none is passed.
 * I explicitly write it for the sake of understanding the api.
 * This function must return the plural index.
 */
var myPluralRule = function (n) {
    if (1 === n) {
        return 0;
    }
    return 1;
};
translatee.addDictionary("fr", dictionaryFR, myPluralRule);
translatee.addDictionary("en", dictionaryEN, myPluralRule);
translatee.setDefaultLang("fr");


//----------------------------------------
// USAGE
//----------------------------------------

console.log(translatee._("hello")); // bonjour
console.log(translatee._("hello you", {
    name: "boris",
})); // bonjour boris
console.log(translatee._n("I have x cats", 5)); // J'ai 5 chats


```






Class Overview
===========


Plural/non-plural
--------------
Translatee distinguishes two types of strings:

- non-plural string (which doesn't involve a plural)
- plural string (which involves a plural)

The _ method fetches non-plural translations.
The _n method fetches plural translations.


Plural selector and dictionary structure
---------------
The **plural selector** is a function that returns a plural index.
The plural index indicates which translation (in the dictionary) to choose from when a plural form is required.

The dictionary is a map of msgId to array of translations.
In singular string (aka non-plural string), the array contains only one translation.
In plural strings, the array contains more than one translation, depending on the language,
and the **plural selector** function returns the index of the translation to return.
The order of the translation depends on the person who creates the dictionary.

In translatee, the plural selector function is always bound to a dictionary.



Strict mode
-----------
With strict mode on, all errors throw an exception.
With strict mode off, the translation methods always return the msg id if there is an error.



History log
===========

- 1.0.0 -- 2020-04-02

    - initial commit




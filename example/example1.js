const Translatee = require('../index.js');


//----------------------------------------
// FULL EXAMPLE
//----------------------------------------
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


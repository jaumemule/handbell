const accepted = ['es', 'ca', 'en']
const defaultLanguage = 'en'
const parser = require('accept-language-parser');

module.exports = {
    selectFromISOCode2: function(fromLanguageISOCode2) {
        if (accepted.includes(fromLanguageISOCode2)) {
            return fromLanguageISOCode2
        } else {
            return defaultLanguage
        }
    },
    convertFromAcceptHeader: function(headerLanguage) {
        if (!headerLanguage) {
            headerLanguage = defaultLanguage
        }
        let languages = parser.parse(headerLanguage);
        return languages[Object.keys(languages)[0]].code
    }
}
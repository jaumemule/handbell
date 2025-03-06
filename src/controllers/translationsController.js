const clientLanguage = require('../application/clientLanguage')
const translationsModule = require('../application/allTranslations')
module.exports = {
    shoppers: function(req, res) {

        let translations = translationsModule.all()
        let iso2CodeFromBrowser = clientLanguage.convertFromAcceptHeader(req.headers["accept-language"])
        let selectedLanguage = clientLanguage.selectFromISOCode2(iso2CodeFromBrowser)

        // TODO compile translations on start-up instead of this
        let translationsCompiled = {}
        for (let translation in translations) {
            translationsCompiled[translation] = translations[translation][selectedLanguage]
        }

        res.send(translationsCompiled)
    }
}
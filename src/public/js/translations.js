$(document).ready(function() {
    makeGetCall("/api/v1/shoppers-translations").done(function(response, textStatus, xhr) {
        let translations = response
        $("trans").each(function() {
            let tag = $(this).attr('tag')
            let translation = translations[tag]
            $(this).replaceWith(translation)
        })
    }).fail(function(response, textStatus, xhr) {
        console.log(response.responseJSON, textStatus)
        alert("Could not load the menu :( some error happened. Please, order at the bar.")
    })
})

$(function() { //shorthand document.ready function
    $('#login_form').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
        let data = $("#login_form :input").serializeArray();

        let email = data[0].value
        let password = data[1].value

        let payload = {email: email, password: password}
        makePostCall("/api/v1/user-login", payload).done(function(response, textStatus, xhr) {

            localStorageSession(response.data.token, response.data.merchantId)

            window.location = '/merchants-orders'
        }).fail(function(response, textStatus, xhr) {
            $("#feedback").html(response.responseJSON.message)
        })
    });
});
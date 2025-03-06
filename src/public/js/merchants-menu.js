
var socket = io.connect('/');

socket.on('menu/' + merchantId(), function(response) {
    $("#menu-section").empty()

    for(i = 0; i < response.orders.length; i++) {
        printOrders(response.orders[i])
    }
});

function makeItemActive(itemId) {

    let headers = {
        authorization: token()
    }

    makePatchCall("/api/v1/menu-item/activate/" + itemId, {}, headers).fail(function(response, textStatus, xhr) {
        alert("something went wrong...")
    }).done(function(response, textStatus, xhr) {
        location.reload();
    })
}

function makeItemInActive(itemId) {

    let headers = {
        authorization: token()
    }

    makePatchCall("/api/v1/menu-item/deactivate/" + itemId, {}, headers).fail(function(response, textStatus, xhr) {
        alert("something went wrong...")
    }).done(function(response, textStatus, xhr) {
        location.reload();
    })
}

function printItems(item) {
    let title = item.title
    let isActive = item.active

    if (isActive) {
        html =
            "<div class=\"container-fluid col-9 py-1 mb-1 d-flex flex-wrap menu-item\">"+
            "    <p>" + title + " ("+item.price/ 100+" "+item.currency+")</p>"+
            "</div>"+
            "<div class=\"container-fluid col-2 py-1 mb-1 d-flex flex-wrap menu-button\">"+
            "    <button onclick='makeItemInActive(\""+item._id+"\")' type=\"button\" class=\"btn btn-danger\">X</button>"+
            "</div>";

        $("#menu-active-items").append(html)

    } else {
        html =
            "<div class=\"container-fluid col-9 py-1 mb-1 d-flex flex-wrap menu-item\">"+
            "    <p>" + title + " ("+item.price/ 100+" "+item.currency+")</p>"+
            "</div>"+
            "<div class=\"container-fluid col-2 py-1 mb-1 d-flex flex-wrap menu-button\">"+
            "    <button onclick='makeItemActive(\""+item._id+"\")' type=\"button\" class=\"btn btn-success\">✓</button>"+
            "</div>";

        $("#menu-inactive-items").append(html)
    }
}

$(document).ready(function() {

    getMerchant(function (data) {} )

    makeGetCall("/api/v1/merchant-menu/" + merchantId()).fail(function(response, textStatus, xhr) {

    }).done(function(response, textStatus, xhr) {
        for(i = 0; i < response.menu.length; i++) {
            printItems(response.menu[i])
        }

    }).fail(function(response, textStatus, xhr) {
        console.log(response.responseJSON, textStatus)
        alert("something went wrong")
    })
})
var socket = io.connect('/');

let audio = new Audio('/mp3/received-order.mp3');
audio.loop = true
audioShouldPlay = false

function toggleAudio() {
    audioShouldPlay = audioShouldPlay !== true;
}

socket.on('order-update/' + merchantId(), function(response) {
    $("#orders-section").empty()
    $("#preparing-section").empty()
    $("#delivered-section").empty()

    for(i = 0; i < response.orders.length; i++) {
        printOrders(response.orders[i])
    }

    if (response.sound !== undefined && response.sound === true && audioShouldPlay === true) {
        audio.play();
    } else {
        audio.pause()
    }
});

function setAsPreparing(orderId) {
    let headers = {
        authorization: token()
    }
    makePatchCall("/api/v1/order-preparing/" + orderId, {}, headers).fail(function(response, textStatus, xhr) {
        alert("something went wrong...")
    }).done(function(response, textStatus, xhr) {
        // do nothing and wait for socket updates
    })
}

function setAsDelivered(orderId) {
    let headers = {
        authorization: token()
    }
    makePatchCall("/api/v1/order-delivered/" + orderId, {}, headers).fail(function(response, textStatus, xhr) {
        alert("something went wrong...")
    }).done(function(response, textStatus, xhr) {
        // do nothing and wait for socket updates
    })
}


function printOrders(order) {
    let title = order._menuItem.title
    let table = order.tableNumber
    let createdAt = order.createdAt

    let date = new Date(createdAt);
    let dateFormatted = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + ' ' +date.getHours() + ':' + date.getMinutes() + 'h'

    let background = ''
    let htmlId = ''

    let html = ''

    if (order.state === 'merchant_notified') {
        htmlId = 'orders-section'
        background = 'received'

        html +=
            "<div class=\"container-fluid col-2 py-1 mb-1 d-flex flex-wrap table-order order-height\">"+
            "    <p>🪑 " + table + " </p>"+
            "</div>"+
            "<div class=\"container-fluid col-8 py-1 mb-1 d-flex flex-wrap order-item order-height "+background+"\">"+
            "    <p>" + title + " </p>"+
            "</div>"+

            "<div class=\"container-fluid col-2 py-1 mb-1 d-flex flex-wrap menu-button order-height\">"+
            "    <button onclick='setAsPreparing(\""+order._id+"\")' type=\"button\" class=\"btn btn-light\">🔔</button>"+
            "</div>";

    } else if(order.state === 'merchant_preparing') {
        htmlId = 'preparing-section'
        background = 'in-process'

        html +=
            "<div class=\"container-fluid col-2 py-1 mb-1 d-flex flex-wrap table-order order-height\">"+
            "    <p>🪑 " + table + " </p>"+
            "</div>"+
            "<div class=\"container-fluid col-8 py-1 mb-1 d-flex flex-wrap order-item order-height "+background+"\">"+
            "    <p>" + title + "</p>"+
            "</div>"+

            "<div class=\"container-fluid col-2 py-1 mb-1 d-flex flex-wrap menu-button order-height\">"+
            "    <button onclick='setAsDelivered(\""+order._id+"\")' type=\"button\" class=\"btn btn-success\">✅</button>"+
            "</div>";

    } else if(order.state === 'merchant_delivered') {
        htmlId = 'delivered-section'
        background = 'in-process'

        html +=
            "<div class=\"container-fluid col-2 py-1 mb-1 d-flex flex-wrap table-order order-height\">"+
            "    <p>🪑 " + table + " </p>"+
            "</div>"+
            "<div class=\"container-fluid col-10 py-1 mb-1 d-flex flex-wrap order-item order-height "+background+"\">"+
            "    <p>" + title + " - " + dateFormatted + " </p>"+
            "</div>";
    }

    $("#"+htmlId).append(html)
}

function setOpenCloseBar(isOpen)
{
    if (!isOpen) {
        $('.opening-wrapper').addClass('opening-wrapper-closed');
    } else {
        $('.opening-wrapper').removeClass('opening-wrapper-closed');
    }
}

$(document).ready(function() {

    getMerchant(function (data) {
        setOpenCloseBar(data.isOpen)
        if (data.isOpen === false) {
            $('#openingCheckbox').click(); // to let the checkbox be set by default
        }
    })

    makeGetCall("/api/v1/orders/" + merchantId()).done(function(response, textStatus, xhr) {
        for(i = 0; i < response.length; i++) {
            printOrders(response[i])
        }

    }).fail(function(response, textStatus, xhr) {
        console.log(response.responseJSON.message, textStatus)
        alert("something went wrong")
    })

    $(document).on("click","#openingCheckbox", function () {

        let isOpen = $(this).is(':checked');

        let payload = {
            "isOpen" : isOpen
        }

        let headers = {
            authorization: token()
        }

        makePatchCall("/api/v1/merchant/"+merchantId()+"/open-close", payload, headers).done(function(response, textStatus, xhr) {
            $('.checkbox-text').toggle()
            setOpenCloseBar(isOpen)
        }).fail(function(response, textStatus, xhr) {
            console.log(response, textStatus)
            alert("Alguna cosa ha fallat")
        })
    })

    $('#mute-unmute').click(function() {
        $('#mute-unmute').toggleClass("fa-volume-mute fa-volume-up");
        toggleAudio();
    });
})
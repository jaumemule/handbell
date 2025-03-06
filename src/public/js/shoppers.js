let orders = []
let menu = []
let tip = 0 // euros in cents
let sessionId = null
let paymentId = null

const urlParams = new URLSearchParams(window.location.search);
const merchantId = urlParams.get('merchantId');
const table = urlParams.get('table');

let socket = io.connect('/');

let audio = new Audio('/mp3/received-order.mp3');

function listenToSocketState(paymentId) {
    socket.on('shopper-order-update/' + paymentId, function(response) {
        let status = response.status
        if (status === 'success') {
            $("#waiting-screen").hide()
            $("#restaurant-has-received").show()
        } else if(status === 'preparing') {
            $("#waiting-screen").hide()
            $("#restaurant-has-received").hide()
            $("#confirmation-screen").show()
            audio.play();
        } else {
            displayFailScreen()
        }
    });
}

function displayFailScreen() {
    $("#waiting-screen").hide()
    $("#restaurant-has-received").hide()
    $("#confirmation-screen").hide()
    $("#payment_request_container").hide()
    $("#wrong-screen").show()
}

function displayItemInfo(id) {
    $("#item-description-"+id).slideToggle()

}

function sumItem(id) {
    let value = $(".sum-item-" + id).text()
    if(parseInt(value) < 99) {
        $(".sum-item-" + id).text(parseInt(value) + 1)

        let exists = false
        let foundIndex = null

        for (let [index, order] of orders.entries()) {
            if (order._id === id) {
                exists = true
                foundIndex = index
            }
        }

        if (exists) {
            orders[foundIndex].quantity++
        } else {
            orders.push({
                '_id': id,
                'quantity': 1
            })
        }

        if (orders.length > 0) {
            $(".demanar").show()
        }

        updateTotalPrice()
    }
}

function decreaseItem(id) {
    let value = $(".sum-item-" + id).text()
    if(parseInt(value) > 0) {
        $(".sum-item-" + id).text(parseInt(value) - 1)

        let exists = false
        let foundIndex = null

        for (let [index, order] of orders.entries()) {
            if (order._id === id) {
                exists = true
                foundIndex = index
            }
        }

        if (exists && orders[foundIndex].quantity > 1) {
            orders[foundIndex].quantity--
        } else if (orders[foundIndex].quantity === 1) {
            orders.splice(foundIndex, 1);
        }

        if (orders.length === 0) {
            $(".demanar").hide()
        }
    }

    updateTotalPrice()
}

function updateTotalPrice() {
    let [finalPrice, totalQuantity] = calculateTotalPrice()
    $("#basket-price").html(finalPrice.toFixed(2))
    $("#basket-quantity").html(totalQuantity)
}

function setTipAmount(amount) {
    tip = parseInt(amount)
}

function calculateTotalPrice() {
    let finalPrice = 0
    let totalQuantity = 0

    for (i=0; i < orders.length; i++) {
        let order = orders[i]

        menu.forEach(function(value) {

            let menuItemId = value._id
            let orderId = order._id

            if (orderId === menuItemId) {
                totalQuantity += order.quantity
                finalPrice += (value.price * order.quantity) / 100
            }
        })
    }

    return [finalPrice, totalQuantity];
}

function printConfirmationItems() {

    let [finalPrice, totalQuantity] = calculateTotalPrice()
    $("#totalPrice").html(finalPrice.toFixed(2))

    for (i=0; i < orders.length; i++) {
        let order = orders[i]
        menu.forEach(function(value) {
            let menuItemId = value._id
            let orderId = order._id

            if (orderId === menuItemId) {
                let price = (value.price * order.quantity) / 100

                html = "<div class=\"container-fluid col-12 py-1 mb-4 d-flex flex-wrap menu-item-wrapper-confirm\">"+
                    "    <div class=\"container-fluid col-12 py-3 mb-4 d-flex flex-wrap menu-item\">"+
                    "        <p>"+value.title+" ("+order.quantity+") | "+price.toFixed(2)+" €</p>"+
                    "    </div>"+
                    "</div>";

                $("#confirm-selection-items").append(html)
            }
        })
    }

}

function downloadInvoice() {
    $(".invoice-button").hide()
    $(".invoice-button-loading").show()

    getPdfDocument("/api/v1/invoice/" + paymentId, 'receipt', function() {
        $(".invoice-button-loading").hide()
        $(".invoice-button-done").show()
    })
}

function deviceId() {
    return localStorage.getItem('HandBellDeviceId')
}

function setDeviceId(deviceId) {
    localStorage.setItem('HandBellDeviceId', deviceId)
}

$(document).ready(function() {

    if (!deviceId()) {
        makeGetCall("/api/v1/device-id").done(function (response, textStatus, xhr) {
            setDeviceId(response.deviceId)
        })
    }

    $(window).on({
        'touchmove': function(e) {
            let scroll = $(window).scrollTop();
            if (scroll > 50) {
                $('#top-arrow').fadeIn()
            } else {
                $('#top-arrow').fadeOut()
            }
        }
    });

    $(document).on("click","#top-arrow", function () {
        $(document).scrollTop(0)
        $('#top-arrow').fadeOut()

    })

    $("#table-number").html(table)

    headers = {}

    function printMenuItems(item) {
        let price = item.price / 100
        let subCategory = item.subCategory || 'other'
        let subCategoryTag = item.subCategoryTag || 'other'

        html =
            " <div class=\"container-fluid col-12 py-1 d-flex flex-wrap inner-menu-item-wrapper\">"+
            "    <div onclick=\"displayItemInfo('"+item._id+"')\" class=\"container-fluid col-8 py-1 mb-4 d-flex flex-wrap menu-item\">";
        if (item.description) { // show info or not
            html+="        <p>"+item.title+"</p>"; // <span class="item-description-info">i</span> think if fine to add it

        } else {
            html+="        <p>"+item.title+"</p>";

        }

        html +=" <p class=\"item-price\">"+price.toFixed(2)+" €</p>"+
            "    </div>"+
            "    <div class=\"col-4 buttons-wrapper\">"+
            "        <span class=\"item-amount sum-item-"+item._id+"\">0</span>"+
            "        <span onclick=\"sumItem('"+item._id+"')\" class=\"item-calculator\">+</span>"+
            "        <span onclick=\"decreaseItem('"+item._id+"')\" class=\"item-calculator minus\">-</span>"+
            "    </div>";
        if (item.description) {
            html += "   <div id=\"item-description-"+item._id+"\" class=\"item-description container-fluid col-12 py-1 \">"+
            "        <p>"+item.description+"</p>"+
            "   </div>";
        }

        html+= " </div>";

        function defineSubcategory(inCategory, cb) {
            let subCategoryElementId = 'subCategory-' + inCategory + '-' + subCategoryTag;

            if (!document.getElementById(subCategoryElementId)) {

                if (subCategory !== 'other') {

                    let subcategoryMenuItemElement =
                       " <li class=\"nav-item\">"+
                       "     <a class=\"nav-link menu-subcategory-button menu-item-subcategory\""+
                       "        href=\"#"+subCategoryElementId+"\">"+subCategory+"</a>"+
                       " </li>";

                    $(".subcategory-item-menu-"+inCategory).append(subcategoryMenuItemElement)

                }

                let innerText = subCategory

                if (subCategory === 'other') {
                    innerText = ''
                }

                let subcategoryElement =
                    "<div class=\"col-12\" style=\"float:left\" id='"+subCategoryElementId+"'>" +
                        "<div class=\"col-12 subcategory-title\">"+innerText+"</div>" +
                    "</div>"

                $("#menu-items-"+inCategory).append(subcategoryElement)
            }

            cb(subCategoryElementId)
        }

        defineSubcategory(item.category, function(elementId) {
            $("#"+elementId).append(html)
            $("#menu-items").show()
        })
    }

    makeGetCall("/api/v1/merchant/" + merchantId).done(function(response, textStatus, xhr) {
        let name = response.name

        if (response.runOnMode === 'sandbox') {
            name += "<div style='font-size: 1rem'>(sandbox)<div>"
        }

        $("#merchant-title").html(name)

        if (!response.isOpen) {
            $('.main-wrapper').hide()
            $('#closed-screen').show()
            $('#menu-category').attr('style','display:none !important');
        }

    }).fail(function(response, textStatus, xhr) {
        console.log(response.responseJSON, textStatus)
        alert("Could not load the menu :( some error happened. Please, order at the bar.")
    })

    makeGetCall("/api/v1/menu/" + merchantId + '/' + table).done(function(response, textStatus, xhr) {
        menu = response.menu

        for(i = 0; i < response.menu.length; i++) {
            printMenuItems(response.menu[i])
        }

        sessionId = response.sessionId

    }).fail(function(response, textStatus, xhr) {
        console.log(response.responseJSON, textStatus)
        alert("Could not load the menu :( some error happened. Please, order at the bar.")
    })

    $(document).on("click",".tip-amount", function () {
        $('.tip-amount').removeClass('tip-selected');
        $(this).addClass('tip-selected');
        let amount = $(this).attr('amount')
        setTipAmount(amount)
    });

    $(document).on("click",".menu-category-button", function () {
        $('.menu-category-button').removeClass('menu-item-category-selected');
        $(this).addClass('menu-item-category-selected');
        let trigger = $(this).attr('trigger')
        $('.menu-item-wrapper').hide()
        $('.subcategory-menu').hide()
        $('#subcategory-' + trigger).show()
        $('#' + trigger).show()
    });

    $(document).on("click","#demanar-wrapper", function () {
        printConfirmationItems()
        $('.main-wrapper').hide()
        $('#confirm-selection-screen').show()
        $('#payment-method').show()
        $(this).hide()
        $("#go-back-to-menu").show()
        $('#menu-category').attr('style','display:none !important');
    })

    $(document).on("click","#go-back-to-menu", function () {
        $('.main-wrapper').show()
        $('#confirm-selection-screen').hide()
        $(this).hide()
        $("#confirm-selection-items").empty()
        $(".demanar").show()
        $("#totalPrice").html('0')
        $('#menu-category').attr('style','display:block !important');
    })

    $(document).on("click","#payment-method", function () {

        let data = {
            "menuItems" : orders,
            sessionId: sessionId,
            deviceId: deviceId(),
            tip: tip
        }

        $(this).hide()
        $("#loading-payment-method").show()

        makePostCall("/api/v1/payment/" + merchantId + '/' + table, data).done(function(response, textStatus, xhr) {
            let providerPaymentId = response.providerPaymentId
            paymentId = response.paymentId

            let style = {
                base: {
                    height: '200px',
                    padding: '32px 28px'
                }
            };

            // Confirm the payment in Gpay and Apple pay
            // function gPayAndApplePayMoneiTokenHandler(token, paymentId) {
            //     $("#waiting-screen").show()
            //     $('#confirm-selection-screen').hide()
            //     $("#go-back-to-menu").hide()
            //
            //     listenToSocketState(paymentId)
            //
            //     return monei
            //         .confirmPayment({paymentId: providerPaymentId, paymentToken: token})
            //         .then(function (result) {
            //             console.log(result)
            //
            //             if (result.status === 'FAILED') {
            //                 displayFailScreen()
            //             } else {
            //                 // At this moment you can show a customer the payment result
            //                 // But you should always rely on the result passed to the callback endpoint on your server
            //                 // to update the order status
            //             }
            //         })
            //         .catch(function (error) {
            //             displayFailScreen()
            //             console.log(error);
            //         });
            // }

            // Create an instance of the Google Pay component.
            // var paymentRequest = monei.PaymentRequest({
            //     paymentId: providerPaymentId,
            //     style: style,
            //     onSubmit(result) {
            //         gPayAndApplePayMoneiTokenHandler(result.token, paymentId);
            //     },
            //     onError(error) {
            //         alert('Alguna cosa ha anat malament al validar el pagament. Sisplau, conulta amb el local')
            //         console.log(error);
            //     }
            // });
            //
            // // Render an instance of the Payment Request Component into the `payment_request_container` <div>.
            // paymentRequest.render('#payment_request_container').then(function() {
            //     $("#loading-payment-method").hide()
            // });

        }).fail(function(response, textStatus, xhr) {
            console.log(response.responseJSON, textStatus)
            alert("Could not load the menu :( some error happened. Please, order at the bar.")
        })
    })
})
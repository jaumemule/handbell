let currentLocation = window.location.pathname

if(!token() && (currentLocation !== '/login' && currentLocation !== '/' )) {
    window.location = '/login'
}

if(token() && (currentLocation === '/' || currentLocation === '/login')) {
    window.location = '/merchants-orders'
}

function localStorageSession(token, merchantId) {
    localStorage.setItem('HandBellSessionToken', token)
    localStorage.setItem('HandBellSessionMerchantId', merchantId)
}

function emptySession() {
    localStorage.removeItem('HandBellSessionToken')
    localStorage.removeItem('HandBellSessionMerchantId')
}

function merchantId() {
    return localStorage.getItem('HandBellSessionMerchantId')
}

function token() {
    return localStorage.getItem('HandBellSessionToken')
}

function getMerchant(cb)
{
    makeGetCall("/api/v1/merchant/" + merchantId()).done(function(response, textStatus, xhr) {
        $("#header-merchant-title").html(response.name)
        $("#link-to-qr").attr('href', '/merchants-qr?merchantId='+merchantId())
        cb(response)
    }).fail(function(response, textStatus, xhr) {
        alert("something went wrong")
    })
}

makeGetCall = function (url, headers) {
    return $.ajax({
        type: "GET",
        headers: headers,
        url: url,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        fail: function () {
            alert("Something went wrong!");
        }
    });
}

getPdfDocument = function(url, fileName, cb) {
    fileName+='.pdf'
    $.ajax({
        url: url,
        cache: false,
        xhr: function () {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 2) {
                    if (xhr.status == 200) {
                        xhr.responseType = "blob";
                    } else {
                        xhr.responseType = "text";
                    }
                }
            };
            return xhr;
        },
        success: function (data) {
            //Convert the Byte Data to BLOB object.
            var blob = new Blob([data], { type: "application/pdf" });

            //Check the Browser type and download the File.
            var isIE = false || !!document.documentMode;
            if (isIE) {
                window.navigator.msSaveBlob(blob);
                cb()
            } else {
                var url = window.URL || window.webkitURL;
                link = url.createObjectURL(blob, fileName);
                var a = $("<a />");
                a.attr("download", fileName);
                a.attr("href", link);
                $("body").append(a);
                a[0].click();
                $("body").remove(a);
                cb()
            }
        },
        fail: function() {
            alert("Could not load the file :( some error happened.")
        }
    });
}

makePostCall = function (url, data, headers, success, fail) {
    return $.ajax({
        type: "POST",
        url: url,
        headers: headers,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
    })
}

makePatchCall = function (url, data, headers, success, fail) {
    return $.ajax({
        type: "PATCH",
        url: url,
        headers: headers,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
    })
}
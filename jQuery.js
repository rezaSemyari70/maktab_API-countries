$(document).ready(function () {
    var settings = {
        "url": "https://restcountries.eu/rest/v2/all",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        $('#select-country').empty();
        for (const country of response) {
            $('#select-country').append(`<option value = ${country.alpha3Code}>${country.name}</option>`)
        }
    });

    $('#select-country').change(function (event) {
        $.ajax({
            url: `https://restcountries.eu/rest/v2/alpha/${$(this).val()}`,
            "method": "GET"
        }).done(function (response) {
            $('#flag').attr('src', response.flag);
            $('#call-code').html(
                `<p class="call-code">${response.callingCodes}</p>`
            )
            $('#info-country').html(`
            <p>${response.name}</p>
            <span><p>Native Name:</p><p>${response.nativeName}</p></span>
            <span><p>Capital:</p><p>${response.capital}</p></span>
            <span><p>Region:</p><p>${response.region}, ${response.subregion}</p></span>
            <span><p>Population:</p><p>${response.population}</p></span>
            <span><p>Languages:</p><p>${response.languages[0].name}</p></span>
            <span><p>Timezone:</p><p>${response.timezones[0]}</p></span>
            `)
        })

    })

    var app = new Mapp({
        element: '#app',
        presets: {
            latlng: {
                lat: 36,
                lng: 52,
            },
            zoom: 6
        },
        apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUyN2UxYWYzODc5ZmI3ZmU3NjZhNDIwNTU4Mzc4NThiMDFjNzcwYjg3NjBiNGM3MDczMjA3NzMyNDgyMDJmYTFjMjA4NDhiNjg4YjdiYmM0In0.eyJhdWQiOiI5NTU2IiwianRpIjoiNTI3ZTFhZjM4NzlmYjdmZTc2NmE0MjA1NTgzNzg1OGIwMWM3NzBiODc2MGI0YzcwNzMyMDc3MzI0ODIwMmZhMWMyMDg0OGI2ODhiN2JiYzQiLCJpYXQiOjE1OTE2MzEyNjIsIm5iZiI6MTU5MTYzMTI2MiwiZXhwIjoxNTk0MjIzMjYyLCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.d98Mhoor0hNNlsKkmaADNG_fsPdwuVXym33DNnLJtBelsrY9hJlNQTA5-fZmk5UqjN32Uh8rsC75FNebnDX0q_8p6nU3wwNES-mI9hN0ViCf8CLVmVfEq2myWgHdmMcoi0fHgsFzsjlSJ2oE_g9xQ8H_z6M-s1qD282sj1q-VETVGdjPLogE10FO0SWhkPWyoe01a4LPNfsvmIViTBKehNEmxJAx-Fu7PH8NvkL4Je-NXXaWUYXh04xOz-l2I8CeJUBuYvOOTefFOXuxRHQNy3bRikkj9DSU-HZg-drPXMkVR_cqXxxBhAHiV5_RCj-916UJKTuuc3LcUcf0KyI1pg'
    });
    app.addLayers();
})
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
        })
    })
})
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
            debugger
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
            `  
            )
        })
    })
})
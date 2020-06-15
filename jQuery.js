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

            $.ajax({
                url: `http://api.openweathermap.org/data/2.5/weather?q=${response.capital}&appid=44b1fe8a6c0207544cdd674445971577`,
                'method': 'GET',
            }).done(function (response) {
                $('#weatherIcon').html(`
                  <img class="weatherIcon" src="http://openweathermap.org/img/wn/${
                    response.weather[0].icon}@2x.png">`);

                $('#weatherInfo').html(`
                    <span><p>wind speed:</p> <p>${response.wind.speed}</p><p>MS</p></span>
                    <span><p>temperature:</p> <p>${response.main.temp}S</p><p>c</p></span>
                    <span><p>humadity:</p> <p>${response.main.humidity}</p><p>%</p></span>
                    <span><p>visibility:</p> <p>${response.visibility}</p><p>m</p></span>
                `)
                $("#map").empty();
                const app = new Mapp({
                    element: '#app',
                    presets: {
                        latlng: {
                            lat: response.coord.lat,
                            lng: response.coord.lng,
                        },
                        zoom: 3,
                    },
                    apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNjNzk2ZDgyM2Q4NGI5MDczYTVhMzk1YWI0YWU2MTZlMjE1MWExZDMyZmFmMjhiMmUyZjNlMDFkNzRmZTRhZWQ4YjhmMmZiNGY5NzFkZmIzIn0.eyJhdWQiOiI5NTI5IiwianRpIjoiM2M3OTZkODIzZDg0YjkwNzNhNWEzOTVhYjRhZTYxNmUyMTUxYTFkMzJmYWYyOGIyZTJmM2UwMWQ3NGZlNGFlZDhiOGYyZmI0Zjk3MWRmYjMiLCJpYXQiOjE1OTE0NDUzMjksIm5iZiI6MTU5MTQ0NTMyOSwiZXhwIjoxNTk0MDM3MzI5LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.r6d7NdhY0jwA_39wrChHvjQbnLTpseQU1GjpOcOnR3YWbrxBTGxCyS6Fm9fa3SEnXPdx46W1XwX_lwBddTS5h2B40vCHeyqV9SdI5mV6xI1NFJ0iGNJJz_7SusuPAKDy41xZuJywvihLLW5aUTk9wpmNuXiOY8gM8MOsnK__YSbVLp2Kle301sP7t5dnL5SNLFjQSdcDz6eOE6Sw_kEwOLo6aYpGBlUrYuBsuMvZI--3tAFFbdppbt-TjnzurV6h0lOC18Nm4WFZFOXwRzD5NgqwjBlbOVGeRPWNQWOLruEluoHNV-JQ3cKDRsoiGtxntKFmOWyVzHYc9lecAhzf_g',
                });
                app.addLayers();
                app.addMarker({
                    name: "basic-marker",
                    latlng: {
                        lat: response.coord.lat,
                        lng: response.coord.lng,
                    },
                    popup: {
                        title: {
                          html: `${response.translations.fa}`,
                        },
                        open: true,
                    },
                });
            });
        })
    })

})
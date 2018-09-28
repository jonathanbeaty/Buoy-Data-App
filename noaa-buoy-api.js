//key: 'KNetqWVApmkOqyMLiwxTMmCaSFEGsqrl'

const NOAA_ENDPOINT_URL = 'https://www.ndbc.noaa.gov/data/realtime2/';
const NOAA_KEY = 'KNetqWVApmkOqyMLiwxTMmCaSFEGsqrl';


function getDataFromApi(location, dom) {

    $.ajax({
            url: NOAA_ENDPOINT_URL + location + '.spec',
            type: 'GET',
            headers: {
                'contentType': 'multipart/form-data',
                key: NOAA_KEY
            },
            success: function (data) {
                console.log("success");
                $(".api-results").append(`<pre id="${dom}">${data}</pre>`);
            },
        })
        .fail(function () {
            alert("ERROR");
        })
}

getDataFromApi(42035, `galveston`);

function handleLocation() {
    if ($("#dropDownMenu option:selected").text() === `Galveston`) {
        runGalvestonApi();
    } else if ($("#dropDownMenu option:selected").text() === `Freeport`) {
        runFreeportApi();
    }
}

function runGalvestonApi() {
    $("#freeport").remove();
    getDataFromApi(42035, `galveston`);
}

function runFreeportApi() {
    $("#galveston").remove();
    getDataFromApi(42019, `freeport`);
}

$("select").change(function () {
    handleLocation();
});
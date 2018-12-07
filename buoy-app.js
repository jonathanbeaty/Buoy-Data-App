const STORMGLASS_ENDPOINT_URL = 'https://api.stormglass.io/point';
const STORMGLASS_KEY1 = '49bceb6c-b6f6-11e8-8a3b-0242ac130004-49bcef86-b6f6-11e8-8a3b-0242ac130004';
const STORMGLASS_KEY2 = '17cb61ac-c767-11e8-a9d2-0242ac130004-17cb62b0-c767-11e8-a9d2-0242ac130004';

function getDataFromApi(lat, lng) {

    const params = 'waveHeight,airTemperature,waterTemperature,wavePeriod,waveHeight,waveDirection,swellPeriod,swellHeight,swellDirection,windDirection,windSpeed,seaLevel';

    $.ajaxSetup({
        url: `https://api.stormglass.io/point?lat=${lat}&lng=${lng}&params=${params}`,
        headers: {
            'Authorization': STORMGLASS_KEY2
        }
    })

    $.ajax({
            type: 'GET',
            success: function (data) {
                console.log("success");
                console.log(data);

                // currentAirTemperature = data.hours[0].airTemperature[0].value * 1.8 + 32;
                currentWaterTemp = data.hours[0].waterTemperature[0].value * 1.8 + 32;
                currentSwellPeriod = data.hours[0].swellPeriod[1].value;
                currentSwellHeight = data.hours[0].swellHeight[1].value * 3.28084;
                currentSwellDirection = data.hours[0].swellDirection[1].value
                currentWaveHeight = data.hours[0].waveHeight[1].value * 3.28084;
                currentWindSpeed = data.hours[0].windSpeed[1].value * 0.621371;
                currentWindDirection = data.hours[0].windDirection[1].value;
                currentTide = data.hours[0].seaLevel[0].value;

                // $(".api-results").append(`<pre class="data-results"><b>Air Temperature:</b> ${currentAirTemperature}°F</pre>`);
                $(".api-results").append(`<pre class="data-results"><b>Water Temperature:</b> ${currentWaterTemp}°F</pre>`);
                $(".api-results").append(`<pre class="data-results"><b>Swell Period:</b> ${currentSwellPeriod} Seconds</pre>`);
                $(".api-results").append(`<pre class="data-results"><b>Swell Height:</b> ${currentSwellHeight} FT</pre>`);
                $(".api-results").append(`<pre class="data-results"><b>Swell Direction:</b> ${currentSwellDirection} °</pre>`);
                $(".api-results").append(`<pre class="data-results"><b>Wave Height:</b> ${currentWaveHeight} FT</pre>`);
                $(".api-results").append(`<pre class="data-results"><b>Wind Speed:</b> ${currentWindSpeed} mph</pre>`);
                $(".api-results").append(`<pre class="data-results"><b>Wind Direction:</b> ${currentWindDirection} °</pre>`);
                $(".api-results").append(`<pre class="data-results"><b>Sea Level:</b> ${currentTide}</pre>`);

                let swellPeriodDataArrPre = [];
                let xAxisLabelsPre = [];

                x = 0;
                for (let i = 0; i <= 48; i++) {
                    swellPeriodDataArrPre.push(data.hours[i].swellPeriod[1].value);
                    xAxisLabelsPre.push(x);
                    x++;
                }

                Chart.defaults.global.defaultFontColor = 'black';
                Chart.defaults.global.defaultFontSize = 12;

                let myLineChart = {
                    type: 'line',
                    data: {
                        labels: xAxisLabelsPre,
                        datasets: [{
                            label: 'Swell Period Next 48 hours (Seconds)',
                            fill: true,
                            backgroundColor: 'rgba(255, 99, 132, 0.25)',
                            borderColor: 'black',
                            data: swellPeriodDataArrPre,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    reverse: false
                                }
                            }]
                        }
                    }
                }

                let ctx = document.getElementById('myChart1').getContext('2d');
                new Chart(ctx, myLineChart);

                let waveHeightDataArrPre = [];

                for (let i = 0; i <= 48; i++) {
                    waveHeightDataArrPre.push(data.hours[i].waveHeight[1].value * 3.28084);
                }

                let waveHeightDataArr = waveHeightDataArrPre.reverse();

                let myLineChartWave = {
                    type: 'line',
                    data: {
                        labels: xAxisLabels,
                        datasets: [{
                            label: 'Wave Height Last 48 hours (ft)',
                            fill: true,
                            backgroundColor: 'rgba(255, 99, 132, 0.25)',
                            borderColor: 'black',
                            data: waveHeightDataArr,
                            borderWidth: 1
                        }],
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    reverse: false
                                }
                            }]
                        }
                    }
                }

                let ctxWave = document.getElementById('myChart2').getContext('2d');
                new Chart(ctxWave, myLineChartWave);

            }
        })
        .fail(function () {
            alert("ERROR");
        })
}

var x = document.getElementById("demo");

var map, infoWindow;

function initMap(lat, lng) {

    let styledMapType = new google.maps.StyledMapType(
        [{
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ebe3cd"
                }]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#523735"
                }]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#f5f1e6"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#c9b2a6"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#dcd2be"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ae9e90"
                }]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#93817c"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#a5b076"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#447530"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f1e6"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#fdfcf8"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f8c967"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#e9bc62"
                }]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e98d58"
                }]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#db8555"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#806b63"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#8f7d77"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#ebe3cd"
                }]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#b9d3c2"
                    },
                    {
                        "weight": 8
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#92998d"
                }]
            }
        ], {
            name: 'Styled Map'
        });

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: latitude,
            lng: longitude
        },
        zoom: 9
    });
    infoWindow = new google.maps.InfoWindow;

    let pos = {
        lat: latitude,
        lng: longitude
    }

    let pos2 = `${latitude},${longitude}`;

    map.setCenter(pos);
    infoWindow.setPosition(pos);

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    geocodeLatLng(geocoder, map, infowindow, pos2);
}


function geocodeLatLng(geocoder, map, infowindow, pos2) {
    var input = pos2;
    var latlngStr = input.split(',', 2);
    var latlng = {
        lat: parseFloat(latlngStr[0]),
        lng: parseFloat(latlngStr[1])
    };
    geocoder.geocode({
        'location': latlng
    }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                map.setZoom(11);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
                $("#text-box").remove();
                $("#append-here").append(`<h3 id="current-location">Location: </h3>
                <h4 id="ocean-data">Current Ocean Conditions:</h4>`);
                $("#current-location").append(`<pre id="address" background-color="grey">${results[0].formatted_address}</pre>`);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

//Event Listener - Button
$("#start-button").on("click", function getLocation() {
    $("#parallax-container").addClass('parallax1');
    $(".data-results").remove();
    $("#current-location").remove();
    $("#ocean-data").remove();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
});

//Callback function, receive users current location (lat,lng)
function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    getDataFromApi(latitude, longitude);
    initMap(latitude, longitude);
}


$(function () {
    var autocomplete;
    var geocoder;
    var input = document.getElementById('location');
    var options = {
        types: ['(regions)'] // (cities)
    };

    autocomplete = new google.maps.places.Autocomplete(input, options);

    $('#go').click(function () {
        if ($("#location").val()) {
            $("#parallax-container").addClass('parallax1');
            $("#text-box").remove();
            $(".data-results").remove();
            $("#current-location").remove();
            $("#ocean-data").remove();
            var location = autocomplete.getPlace();
            geocoder = new google.maps.Geocoder();
            console.log(location['geometry'])
            latitude = location['geometry']['location'].lat();
            longitude = location['geometry']['location'].lng();

            getDataFromApi(latitude, longitude);
            initMap(latitude, longitude);
        } else {
            alert('Whoa bro, enter a destination first, then try again');
        }
    });
});
/*
        properties now: precipitation, precipitation_type, temp, feels_like, dewpoint, wind_speed, wind_gust, baro_pressure, visibility, humidity, wind_direction, sunrise, sunset, cloud_cover, cloud_ceiling, cloud_base, surface_shortwave_radiation, weather_code
        properties daily: precipitation, precipitation_accumulation, temp, feels_like, dewpoint, wind_speed, baro_pressure, visibility, humidity, wind_direction, sunrise, sunset, moon_phase, weather_code
      */

let startPos;
const outLat = document.getElementById('out-lat');
const outLog = document.getElementById('out-log');
const outTemp = document.getElementById('out-temp');
const outNext = document.getElementById('out-next');

const btnWeather = document.getElementById('get-weather');

// function responsible to call clima cell api
const callApi = () => {
  if (window.fetch) {
    fetch(buildURLRequest(startPos.coords.latitude, startPos.coords.longitude))
      .then((result) => {
        if(result.status === 200) {
          return result.json();
        } else {
         throw new Error(result.status);
        }
      })
      .then((data) => {
        showResult(data);
      })
      .catch((error) => {
        console.log('Catch :', error);
      });
  } else {
    fallbackCallAPI();
  }
};

// function resposible to display the result
const showResult = (data) => {
  outTemp.innerHTML = data[0].temp.value + data[0].temp.units;
};

// function to build the url for the api request
const buildURLRequest = (lat, log) => {
  const apiKey = 'f5DnQ25YmKnF1eTCywJSPw3N2Iu0qJQ6';
  const apiService = 'https://api.climacell.co/v3/weather/nowcast';
  return (
    apiService +
    '?lat=' +
    lat +
    '&lon=' +
    log +
    '&unit_system=sis&timestep=60&start_time=now&fields=temp%2Cfeels_like&' +
    '&apikey=' +
    apiKey
  );
};

//function to do the fallback call
const fallBackCallAPI = () => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', (event) => {
    showResult(JSON.parse(event.target.responseText));
  });

  xhr.open(
    'GET',
    buildURLRequest(startPos.coords.latitude, startPos.coords.longitude)
  );
  xhr.send();
};

document.addEventListener('DOMContentLoaded', () => {
  navigator.geolocation.getCurrentPosition((position) => {
    startPos = position;
    outLat.innerHTML = startPos.coords.latitude;
    outLog.innerHTML = startPos.coords.longitude;

    btnWeather.disabled = false;
    btnWeather.addEventListener('click', callApi);
  });
});

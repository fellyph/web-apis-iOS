/*
        properties now: precipitation, precipitation_type, temp, feels_like, dewpoint, wind_speed, wind_gust, baro_pressure, visibility, humidity, wind_direction, sunrise, sunset, cloud_cover, cloud_ceiling, cloud_base, surface_shortwave_radiation, weather_code
        properties daily: precipitation, precipitation_accumulation, temp, feels_like, dewpoint, wind_speed, baro_pressure, visibility, humidity, wind_direction, sunrise, sunset, moon_phase, weather_code

        O que e indexedDB
        - banco de dados nao relacional
        - permite armazenamento de objetos no browser do usuário
        - nos permite armazenar objetos javascript, arquivos, blobs
        - suporta transacoes
        - la podemos definir multiplos indices para realizar consultas

        Bibliotecas que facilitam o uso de indexedDB
        - IndexedDB Promised
        - localForage
*/

     let startPos;
     const outLat = document.getElementById('out-lat');
     const outLog = document.getElementById('out-log');
     const outTemp = document.getElementById('out-temp');
     const outNext = document.getElementById('out-next');

     const btnWeather = document.getElementById('get-weather');

     // function responsible to call clima cell api
     const callApi = () => {
       if(window.fetch) {
         fetch(buildURLRequest(startPos.coords.latitude, startPos.coords.longitude))
           .then(result => {
             return result.json();
           })
           .then(data => {
             showResult(data);
           }).catch(error => {
             console.log(error)
           });
       } else {
         fallbackCallAPI()
       }
     }

    // function to save the results
    const saveResult = (data) => {
      if(window.indexedDB) {
        const request = window.indexedDB.open("MyWeatherDB",1);

        request.onerror = (event) => {
          console.log('Error request', event)
        }

        request.onsuccess = (event) => {
          console.log('Successed request', event)
        }

        request.onupgradeneeded = () => {
          console.log('Upgraded request', event)
        }

      } else {
        console.log('You don\'t have support');
      }
    }

     // function resposible to display the result
     const showResult = (data) => {
       data.map((item, index) => {
        if(index === 0) {
          outTemp.innerHTML = item.temp.value + item.temp.units;
        } else {
          outNext.innerHTML += `<li>${item.observation_time.value} -
            ${item.temp.value} ${item.temp.units}</li>`;
        }
       });
     }

     // function to build the url for the api request
     const buildURLRequest = (lat, log) => {
       const apiKey = 'f5DnQ25YmKnF1eTCywJSPw3N2Iu0qJQ6';
       const apiService = 'https://api.climacell.co/v3/weather/nowcast'
       return apiService +
           '?lat=' + lat +
           '&lon=' + log +
           '&unit_system=si&timestep=60&start_time=now&fields=temp%2Cfeels_like&' +
           '&apikey=' + apiKey;
     }

     //function to do the fallback call
     const fallBackCallAPI = () => {
       const xhr = new XMLHttpRequest();
       xhr.addEventListener('load', (event) => {
         showResult(JSON.parse(event.target.responseText));
       });

       xhr.open('GET', buildURLRequest(startPos.coords.latitude, startPos.coords.longitude));
       xhr.send();
     }

     document.addEventListener('DOMContentLoaded', () => {
       navigator.geolocation.getCurrentPosition((position) => {
         startPos = position;
         outLat.innerHTML = startPos.coords.latitude;
         outLog.innerHTML = startPos.coords.longitude;

         btnWeather.disabled = false;
         btnWeather.addEventListener('click', callApi);
       })
     });

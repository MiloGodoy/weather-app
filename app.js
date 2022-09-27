window.addEventListener('load', () => {
    let lon;
    let lat;
    
    let temperaturaValor = document.getElementById('temperatura-valor');
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion');

    let ubicacion = document.getElementById('ubicacion');
    let iconoAnimado = document.getElementById('icono-animado');

    let vientoVelocidad = document.getElementById('viento-velocidad');

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(posicion => {
            //console.log(posicion.coords.latitude);
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;

            //ubicacion actual
            //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

            //ubicacion por ciudad
            

            const url = `https://api.openweathermap.org/data/2.5/weather?q=Asuncion&lang=es&units=metric&appid=${API_KEY}`
            
            //console.log(url);

            fetch(url)
                .then( response => { return response.json() })
                .then (data => {
                    let temp = Math.round(data.main.temp)
                    temperaturaValor.textContent = `${temp} `;
                    console.log(data.weather[0].description);
                    
                    let desc = data.weather[0].description
                    temperaturaDescripcion.textContent = desc.toUpperCase();
                    console.log(data.name);

                    ubicacion.textContent = data.name;
                    console.log(data.wind.speed);

                    vientoVelocidad.textContent = `${data.wind.speed} m/s`

                    console.log(data.weather[0].main);
                    switch(data.weather[0].main) {
                        case 'Clear':
                            iconoAnimado.src = './animated/day.svg';
                            console.log('LIMPIO');
                            break;
                        case 'Clouds':
                            iconoAnimado.src = './animated/cloudy-day-1.svg';
                            console.log('NUBLADO');
                            break;
                        case 'Thunderstorm':
                            iconoAnimado.src = './animated/thunder.svg';
                            console.log('Tormenta');
                            break;
                        case 'Drizzle':
                            iconoAnimado.src = './animated/rainy-2.svg';
                            console.log('Llovizna');
                            break;
                        case 'Rain':
                            iconoAnimado.src = './animated/rainy-7.svg';
                            console.log('Lluvia');
                            break;
                        case 'Snow':
                            iconoAnimado.src = './animated/snowy-6.svg';
                            console.log('Nieve');
                            break;
                        case 'Atmosphere':
                            iconoAnimado.src = './animated/weather.svg';
                            console.log('Atmósfera');
                            break;
                        default:
                            iconoAnimado.src = './animated/cloudy-day-3.svg';
                            console.log('Por defecto');
                    }

                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
})
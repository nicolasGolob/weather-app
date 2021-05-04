
//src API -> https://openweathermap.org/current

const api = {
    key:"    ",
    base:"https://api.openweathermap.org/data/2.5/"
}

const searchByCity = document.getElementById('searchByCity');
searchByCity.addEventListener('keypress', setQuery);

function setQuery(event){
    if(event.keyCode == 13){
        getWeatherData(searchByCity.value)
    }
}

function getWeatherData(query){
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather =>{
        return weather.json();
    }).then(displayWeatherData);
}

function displayWeatherData(weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText=`${weather.name}, ${weather.sys.country}`;
    // src:openweathmap : sys -> Internal parameter -> country code 
    let temperature  = document.querySelector('.current .temperature');
    temperature.innerText=`${Math.round(weather.main.temp)}`;
    //math round obviously to round the resulting measurement 
}


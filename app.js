
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
    window.fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weathers =>{
    //once you've got the api back you take what it sent back to you
    //-> weathers = the name of the object given to it -> corresponds to a large object that the api sends back to us
        return weathers.json();
    //convert me this object to json
    }).then(displayWeatherData);
    //then -> promise displayWeatherData in order to dispatch and use the data with this function
}

function displayWeatherData(weathers){
    console.log(weathers);
    let city = document.querySelector('.location .city');
    city.innerText=`${weathers.name}, ${weathers.sys.country}`;
    // src:openweathmap : sys -> Internal parameter -> country code 
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText=buildingDate(now);

    let temperature  = document.querySelector('.current .temperature');
    temperature.innerText=`${Math.round(weathers.main.temp)}`;
    //math round obviously to round the resulting measurement 
    
    let weatherElement = weathers.weather[0].icon;
    $('.weather-icon').attr('src', 'http://openweathermap.org/img/wn/'+ weatherElement +'.png')

    let lowestTemp = document.querySelector('.current .lowest');
    lowestTemp.innerText = `Min : ${weathers.main.temp_min}°c`;

    let highestTemp = document.querySelector('.current .highest');
    highestTemp.innerText = `Max : ${weathers.main.temp_max}°c`;

    function buildingDate(dateArg){
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let day = days[dateArg.getDay()];
        let date = dateArg.getDate();
        let month = months[dateArg.getMonth()];
        let year = dateArg.getFullYear();
        return`${day} ${date} ${month} ${year}`
    }
}



//src API -> https://openweathermap.org/current

const api = {
    key:"    ",
    base:"https://api.openweathermap.org/data/2.5/"
}

const searchByCity = document.querySelector('.searchByCity');
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
    let weatherElement = weathers.weather[0].icon;
    $('.weather-icon').attr('src', 'http://openweathermap.org/img/wn/'+ weatherElement +'.png')
    //create this event cause pb with the display
    const showElement = document.getElementById('showElement');
    showElement.addEventListener('keyup', () => {
    const showIcon = document.getElementById('showIcon');
    showIcon.style.visibility = 'visible';
    const buttonShowDetailsPart = document.getElementById('showDetailsPart')
    buttonShowDetailsPart.style.visibility='visible';
    const showDetailsVisible = document.getElementById('showDetailsVisible');
    showDetailsVisible.style.display = 'inline-grid';
});

    // src:openweathmap : sys -> Internal parameter -> country code 
    let now = new Date();
    let date = document.querySelector('.current-weather .date');
    date.innerText=buildingDate(now);

    function buildingDate(dateArg){
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let day = days[dateArg.getDay()];
        let date = dateArg.getDate();
        let month = months[dateArg.getMonth()];
        let year = dateArg.getFullYear();
        return`Hi, we are ${day} ${date} ${month} ${year}, it's currently`
    }

    let temperature  = document.querySelector('.current-temperature');
    temperature.innerText=`${Math.round(weathers.main.temp)}°`;
    // //math round obviously to round the resulting measurement 

    let city = document.querySelector('.city');
    city.innerText=`In the city of ${weathers.name}, ${weathers.sys.country}`;

    //******************* Details Part  ************************************/
    let weatherDescription = document.querySelector('.weather-description');
    weatherDescription.innerHTML=`<i class="fas fa-cloud-meatball"></i> &nbsp Weather Describe : ${weathers.weather[0].main}`;

    let weatherMin= document.querySelector('.weather-min');
    weatherMin.innerHTML=`<i class="fas fa-temperature-low"></i> &nbsp Minimal : ${weathers.main.temp_min}°c`;

    let weatherMax= document.querySelector('.weather-max');
    weatherMax.innerHTML=`<i class="fas fa-temperature-high"></i> &nbsp Maximal  : ${weathers.main.temp_max}°c`;
    
    let weatherSpeed = document.querySelector('.wind-speed');
    weatherSpeed.innerHTML= `<i class="fas fa-wind"></i> &nbspSpeed : ${weathers.wind.speed} metre per second`;

    let weatherCloud = document.querySelector('.weather-cloud');
    weatherCloud.innerHTML= `<i class="fas fa-cloud"></i> &nbsp Cloud : ${weathers.clouds.all}%`;

    let weatherHumidity = document.querySelector('.weather-humidity');
    weatherHumidity.innerHTML=`<i class="fas fa-tint"></i> &nbsp Humdity : ${weathers.main.humidity}%`;
};


let cityh1 = document.querySelector(".city");
let dateTime= document.querySelector(".datetime");
let forecast = document.querySelector(".forecast");
let temp = document.querySelector(".temp");
let icon = document.querySelector(".icon");
let minTemp = document.querySelector(".min");
let maxTemp = document.querySelector(".max");

let feelsLike = document.getElementById("feel");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let wind = document.getElementById("wind");

let citySearch = document.querySelector(".searchBox")
let city="Mumbai";

citySearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName = document.querySelector(".cityName");
    console.log(cityName);
    city=cityName.value;
    getWeatherData();

    cityName.value="";
    
});



function kelvinToCelsius(kelvin) {
    var celsius = (kelvin - 273.15);
    return celsius.toFixed(2);
}



const getWeatherData= async ()=>{
    const apiModel =` https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=5592850c9ce6fc5328b82e69ebe5a95e`;

const getDateTime=(dt)=>{
    const curDate = new Date (dt*1000);
    console.log(curDate);

    const options = {
        wekkday:"long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const formattedVal = new Intl.DateTimeFormat("en-US",options);
return formattedVal.format(curDate);
};


    const getCountryName= (code)=>{
        return new Intl.DisplayNames([code],{type: "region"}).of(code);};
    
    try{
        const result = await fetch(apiModel);
        const data = await result.json();
        console.log(data);
        

        const { main, name,sys,dt,weather,wind} =data;
        cityh1.innerHTML = `${name},${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);
        temp.innerHTML =` ${kelvinToCelsius(main.temp)}&#176C`;
        minTemp.innerHTML= `Min: ${kelvinToCelsius(main.temp_min.toFixed(2))}&#176C`;
        maxTemp.innerHTML= `Max: ${kelvinToCelsius(main.temp_max.toFixed(2))}&#176C`

        forecast.innerHTML = `${weather[0].main}`;
        const iconVar =weather[0].icon;
        console.log(weather[0].icon);
        icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconVar}@2x.png">`;



        feelsLike.innerHTML = `${kelvinToCelsius(main.feels_like)}&#176C`;
        humidity.innerHTML= `${main.humidity}%`;
        wind.innerHTML= `${wind.speed} m/s`;
        pressure.innerHTML = `${main.pressure} mbar`;

    }
    catch(error){
        console.log(error);
    }
}

document.body.addEventListener("load",getWeatherData());
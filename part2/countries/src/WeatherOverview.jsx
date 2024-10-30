const WeatherOverview = ({weather}) => {
    if (!weather) return
    return (
        <div>
            <h3>Weather in {weather.name}</h3>
            <div>temperature: {weather.main.temp} Celcius</div>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            <div>wind {weather.wind.speed} m/s</div>
        </div>
    )
}

export default WeatherOverview
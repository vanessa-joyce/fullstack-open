import WeatherOverview from "./WeatherOverview"

const CountryDetail = ({country, currentWeather}) => {
    if (!country) return
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <h3>languages</h3>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} width={200} />
            <WeatherOverview weather={currentWeather} />
        </div>
    )
}

export default CountryDetail
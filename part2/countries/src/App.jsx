import { useState, useEffect } from 'react'
import axios from 'axios'
import Result from './Result'
const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countryData, setCountryData] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [countries, setCountries] = useState(null)
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

  useEffect(() => {
    axios.
      get(`${baseUrl}/all`)
      .then(response => setCountries(response.data.map(country => country.name.common)))
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = countries.filter(country => country.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredCountries(filtered)
    }
  }, [searchTerm])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      loadCountryData()
      .then(countryData => {
        setCountryData(countryData)
        loadCountryWeather(countryData.capital)
        .then(currentWeather => setCurrentWeather(currentWeather))
      })
    }
  }, [filteredCountries])

  const loadCountryData = () => {
    return axios
    .get(`${baseUrl}/name/${filteredCountries[0].toLowerCase()}`)
    .then(response => response.data)
  }

  const loadCountryWeather = (capital) => {
    return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${OPEN_WEATHER_API_KEY}`)
    .then(response => response.data)
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleShowClick = (country) => {
    setSearchTerm(country)
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        country: <input value={searchTerm} onChange={handleChange} />
        <Result filteredCountries={filteredCountries} countryData={countryData} currentWeather={currentWeather} handleShowClick={handleShowClick}/>
      </form>
    </div>
  )
}

export default App
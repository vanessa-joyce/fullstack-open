import { useState, useEffect } from 'react'
import axios from 'axios'
import Result from './Result'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countryData, setCountryData] = useState(null)
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
      axios
        .get(`${baseUrl}/name/${filteredCountries[0].toLowerCase()}`)
        .then(response => setCountryData(response.data))
    }
  }, [filteredCountries])

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <form>
        country: <input value={searchTerm} onChange={handleChange} />
        <Result filteredCountries={filteredCountries} countryData={countryData} />
      </form>
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countryData, setCountryData] = useState(null)
  const [countries, setCountries] = useState(null)
  const [result, setResult] = useState(null)

  useEffect(() => {
    console.log('effect run, loading countries')
    console.log('fetching countries')
    axios.
      get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data.map(country => country.name.common))
      })
  }, [])

  useEffect(() => {
    // skip if currency is not defined
    console.log('effect')
    if (searchTerm) {
      const filteredCountries = countries.filter(country => country.toLowerCase().includes(searchTerm.toLowerCase()))
      console.log(filteredCountries, 'filteredCountries')
      showFilteredCountries(filteredCountries)
      if (filteredCountries.length === 1) {
        setSelectedCountry(filteredCountries[0].toLowerCase())
      }
    }
      /*
      console.log('fetching exchange rates...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          setRates(response.data.rates)
        })
    }*/

  }, [searchTerm])

  useEffect(() => {
    if (selectedCountry) {
    console.log('fetching country data...')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${selectedCountry}`)
      .then(response => {
        setCountryData(response.data)
      })

    }
  }, [selectedCountry])

  const showFilteredCountries = (filteredCountries) => {
    console.log(filteredCountries)
    if (filteredCountries.length > 10) {
      setResult('Too many matches, specify another filter')
    } else
    if (filteredCountries.length < 10 && filteredCountries.length >= 1) {
      setResult(filteredCountries)
    }
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    //setCurrency(value)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        country: <input value={searchTerm} onChange={handleChange} />
        <div>{result}</div>
        <div>{countryData?.name?.common}</div>
        <div>{countryData?.capital?.[0]}</div>
      </form>
      <pre>

      </pre>
    </div>
  )
}

export default App
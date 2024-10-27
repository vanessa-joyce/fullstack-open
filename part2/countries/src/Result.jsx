import CountryDetail from "./CountryDetail"
import CountryList from "./CountryList"

const Result = ({filteredCountries, countryData}) => {
    if (filteredCountries.length > 10 ) return <div>Too many matches, specify another filter</div>
    if (filteredCountries.length > 1 && filteredCountries.length < 10 ) return <div><CountryList countries={filteredCountries} /></div>
    if (filteredCountries.length === 1) return <CountryDetail country={countryData} />
}

export default Result
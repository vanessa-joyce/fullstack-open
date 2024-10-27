const CountryList = ({countries, handleShowClick}) => {
    console.log(countries)
    if (!countries) return 
    return (
        <div>
            {countries.map(country => <div key={country}>{country}<button onClick={() => handleShowClick(country)}>show</button></div> )}
        </div>
    )
}

export default CountryList
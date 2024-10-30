const CountryList = ({countries, handleShowClick}) => {
    if (!countries) return 
    return (
        <div>
            {countries.map(country => <div key={country}>{country}<button onClick={() => handleShowClick(country)}>show</button></div> )}
        </div>
    )
}

export default CountryList
const CountryList = ({countries}) => {
    console.log(countries)
    if (!countries) return 
    return (
        <div>
            {countries.map(country => <div key={country}>{country}</div> )}
        </div>
    )
}

export default CountryList
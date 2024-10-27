const CountryDetail = ({country}) => {
    if (!country) return
    console.log(country)
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
        </div>
    )
}

export default CountryDetail
import { useEffect, useState } from "react";
import countriesServices from "./services/countries";
import weatherServices from "./services/weather";

function App() {
  const [allCountriesList, setAllCountriesList] = useState([]);
  const [filteredContriesList, setFilteredContriesList] = useState(null);
  const [isFetchingCountryNames, setIsFetchingCountryNames] = useState(true);
  const [searchedCountry, setSearchedCountry] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    countriesServices.getAll().then((res) => {
      const allCountriesNameList = res.data.map(
        (country) => country.name.common
      );
      setAllCountriesList(allCountriesNameList);
      setIsFetchingCountryNames(false);
    });
  }, []);

  const handleFilterChange = (e) => {
    const inputValue = e.target.value;

    if (!inputValue) {
      setFilteredContriesList(null);
      return;
    }

    const filteredContries = allCountriesList.filter((countryName) =>
      countryName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredContriesList(filteredContries);

    if (filteredContries.length === 1) {
      const countryName = filteredContries[0];
      countriesServices.getCountryDetatil(countryName).then((res) => {
        const countryData = res.data;

        const country = {
          commonName: countryData.name.common,
          officialName: countryData.name.official,
          capital: countryData.capital[0],
          area: countryData.area,
          languages: Object.values(countryData.languages),
          flag: countryData.flag,
        };

        console.log(country);

        setSearchedCountry(country);
        weatherServices.getWeatherFromCityName(country.capital).then((res) => {
          setWeatherInfo(res.data);
        });
        return;
      });
    }
    setSearchedCountry(null);
    setWeatherInfo(null);
  };

  return (
    <>
      {!isFetchingCountryNames && (
        <div>
          <span>Find Countries</span>{" "}
          <input type="text" onChange={handleFilterChange} />
          {filteredContriesList?.length > 10 && (
            <p>Too many matches, specify another filter</p>
          )}
          {filteredContriesList?.length < 10 &&
            filteredContriesList?.length > 1 &&
            filteredContriesList.map((countries) => (
              <p key={countries}>{countries}</p>
            ))}
          {searchedCountry && (
            <div>
              <h1 style={{ marginBottom: "0" }}>
                {searchedCountry.commonName}
              </h1>
              <p>Official Name: {searchedCountry.officialName}</p>
              <br />
              <p>Capital: {searchedCountry.capital}</p>

              <p>Area: {searchedCountry.area}</p>

              <h2>languages:</h2>
              <ul>
                {searchedCountry.languages.map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
              <h1 style={{ fontSize: "10rem", margin: "0" }}>
                {searchedCountry.flag}
              </h1>

              <h1>Weather in {searchedCountry.capital}</h1>
            </div>
          )}
        </div>
      )}
      {isFetchingCountryNames && <p>fetching data...</p>}
    </>
  );
}

export default App;

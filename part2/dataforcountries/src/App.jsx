import { useEffect, useState } from "react";
import countriesSerices from "./services/countries";

function App() {
  const [allCountriesList, setAllCountriesList] = useState([]);
  const [filteredContriesList, setFilteredContriesList] = useState(null);
  const [isFetchingCountryNames, setIsFetchingCountryNames] = useState(true);
  const [searchedCountry, setSearchedCountry] = useState(null);

  useEffect(() => {
    countriesSerices.getAll().then((res) => {
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
      countriesSerices.getCountryDetatil(countryName).then((res) => {
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

        return;
      });
    }
    setSearchedCountry(null);
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
              <h1>{searchedCountry.commonName}</h1>
              <p>official Name: {searchedCountry.officialName}</p>

              <h2>languages:</h2>
              <ul>
                {searchedCountry.languages.map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
              <h1 style={{ fontSize: "10rem",  margin:"0"}}>{searchedCountry.flag}</h1>
            </div>
          )}
        </div>
      )}
      {isFetchingCountryNames && <p>fetching data...</p>}
    </>
  );
}

export default App;

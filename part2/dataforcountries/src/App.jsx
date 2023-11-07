import { useEffect, useState } from "react";
import countriesSerices from "./services/countries";
import countries from "./services/countries";

function App() {
  const [allCountriesList, setAllCountriesList] = useState([]);
  const [filteredContriesList, setFilteredContriesList] = useState(null);
  const [isFetchingCountryNames, setIsFetchingCountryNames] = useState(true);

  useEffect(() => {
    countriesSerices
      .getAll()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const allCountriesNameList = data.map((country) => country.name.common);
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
    console.log(filteredContries);
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
        </div>
      )}
      {isFetchingCountryNames && <p>fetching data...</p>}
    </>
  );
}

export default App;

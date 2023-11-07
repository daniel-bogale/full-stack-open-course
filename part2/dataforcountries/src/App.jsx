import { useEffect, useState } from "react";
import countriesSerices from "./services/countries";

function App() {
  const [allCountriesList,setAllCountriesList] = useState([]);
  const [filteredContriesList, setFilteredContriesList] = useState(null)

  useEffect(() => {
    countriesSerices
      .getAll()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const allCountriesNameList = data.map((country)=> country.name.common)
        setAllCountriesList(allCountriesNameList)
      });
  },[]);

  const handleFilterChange = () => {

  }
  return (
    <>
      <div>
        <span>Find Countries</span> <input type="text" onChange={handleFilterChange} />
      </div>
      {true && <p> Response</p>}
      {}
    </>
  );
}

export default App;

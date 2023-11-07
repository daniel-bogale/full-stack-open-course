// import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
  return fetch(baseUrl)
};

export default { getAll };

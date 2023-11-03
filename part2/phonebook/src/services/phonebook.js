import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newPhoneBook) => {
  return axios.post(baseUrl, newPhoneBook);
};

const update = (id, newPhoneBook) => {
  return axios.put(`${baseUrl}/${id}`, newPhoneBook);
};

const deletePhoneBook = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, deletePhoneBook };

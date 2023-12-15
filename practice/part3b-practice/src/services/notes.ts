import axios from "axios";

const baseUrl = "/api/notes";

export interface NoteType {
  id: number;
  content: string;
  important: boolean;
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response: any) => response.data);
};

const create = (newPhoneBook: NoteType) => {
  const request: any = axios.post(baseUrl, newPhoneBook);
  return request.data;
};

const update = (id: number, newPhoneBook: NoteType) => {
  const request: any = axios.put(`${baseUrl}/${id}`, newPhoneBook);
  return request.data;
};

export default { getAll, create, update };

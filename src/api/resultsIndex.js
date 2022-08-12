import axios from "axios";

export const url = "http://localhost:5000/results";

export const postResults = (result) => axios.post(`${url}/post`, result);

export const getResults = () => axios.get(`${url}`);

export const oneResult = (id) => axios.get(`${url}/${id}`);

export const editResult = (id, updatedResult) =>
  axios.patch(`${url}/${id}`, updatedResult);

export const deleteResults = (id) => axios.delete(`${url}/${id}`);

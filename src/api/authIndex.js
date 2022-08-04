import axios from "axios";
export const url = "http://localhost:5000/user";

export const createUser = (user) => axios.post(`${url}/register`, user);

export const loginUser = (user) => axios.post(`${url}/sign`, user);

export const deleteUser = (id) => axios.delete(`${url}/${id}`);

export const allUsers = () => axios.get(url);

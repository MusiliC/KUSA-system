import axios from "axios";

export const url = "http://localhost:5000/scorer";

export const postPlayer = (player) => axios.post(`${url}/post`, player);

export const getPlayers = () => axios.get(`${url}`);

export const onePlayer = (id) => axios.get(`${url}/${id}`);

export const editPlayer = (id, updatedPlayer) =>
  axios.patch(`${url}/${id}`, updatedPlayer);

export const deletePlayer = (id) => axios.delete(`${url}/${id}`);

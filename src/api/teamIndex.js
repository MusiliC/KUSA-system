import axios from "axios";

export const url = "http://localhost:5000/teams";

export const createTeam = (team) => axios.post(`${url}/register`, team);

export const getTeams = () => axios.get(`${url}`);

export const oneTeam = (id) => axios.get(`${url}/${id}`);

export const editTeam = (id, updatedTeam) =>
  axios.patch(`${url}/${id}`, updatedTeam);

export const deleteTeam = (id) => axios.delete(`${url}/${id}`);

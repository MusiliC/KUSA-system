import axios from "axios";

export const url = "http://localhost:5000/teams";

export const createTeam = (team) => axios.post(`${url}/register`, team);

export const getTeams = () => axios.get(`${url}`);

export const getTopTeams = () => axios.get(`${url}/two`);

export const oneTeam = (id) => axios.get(`${url}/${id}`);

export const editTeam = (id, updatedTeam) =>
  axios.patch(`${url}/${id}`, updatedTeam);

export const deleteTeam = (id) => axios.delete(`${url}/${id}`);

export const editWin = (id, updatedTeam) =>
  axios.patch(`${url}/win/${id}`, updatedTeam);

export const editDraw = (id, updatedTeam) =>
  axios.patch(`${url}/draw/${id}`, updatedTeam);

export const editLost = (id, updatedTeam) =>
  axios.patch(`${url}/lost/${id}`, updatedTeam);

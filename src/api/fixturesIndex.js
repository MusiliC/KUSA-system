import axios from "axios";
export const url = "http://localhost:5000/fixtures";

export const generateFixtures = (eventId) =>
  axios.get(`${url}/generate/${eventId}`);

export const getFixtures = (event) =>
  axios.get(`${url}${event && "?event=" + event}`);

export const deleteFixture = (id) => axios.delete(`${url}/${id}`);

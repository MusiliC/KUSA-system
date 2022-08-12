import axios from "axios";

export const url = "http://localhost:5000/events";

export const createEvent = (event) => axios.post(`${url}/register`, event);

export const getEvent = () => axios.get(`${url}`);

export const getOneEvent = (id) => axios.get(`${url}/${id}`);

export const editEvent = (id, updatedEvent) =>
  axios.patch(`${url}/${id}`, updatedEvent);

export const deleteEvent = (id) => axios.delete(`${url}/${id}`);

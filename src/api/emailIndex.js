import axios from "axios";
export const url = "http://localhost:5050/send-email";

export const sendEmail = (email) => axios.post(url, email);


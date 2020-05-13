import axios from "axios";

const api = axios.create({
  baseURL: "https://backendgobarber.herokuapp.com"
});

export default api;

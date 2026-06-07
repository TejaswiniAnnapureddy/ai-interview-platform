import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-interview-platform-3xbz.onrender.com",
});

export default api;
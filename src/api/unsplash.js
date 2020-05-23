import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: "Client-ID xY7zJJ1iGOu3KJExUHwLdjqn_ezNyp1nLVbLIVdXGLg",
  },
});

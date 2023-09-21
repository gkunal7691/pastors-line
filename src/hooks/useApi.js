import { useState } from "react";
import axios from "axios";

export const useApi = () => {
  const [errors, setErrors] = useState(null);
  const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  api.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = "Bearer " + process.env.REACT_APP_TEMP_TOKEN;
      return config;
    },
    (error) => {
      setErrors(error);
      return Promise.reject(error);
    }
  );
  return { api, errors};
};



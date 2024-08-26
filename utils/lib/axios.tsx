import axios from 'axios';

export const AxiosInstance = axios.create();

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response) {
      if (error?.response.status === 401) {
        console.error('Unauthorized (401): Redirecting to login...');
      } else if (error?.response.status === 403) {
        console.error('Forbidden (403): You do not have permission to access this resource.');
      } else {
        console.log(error.reponse.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    } else if (error?.request) {
      console.error('Request Error: No response received from server.', error.request);
    } else {
      console.error('Error:', error.message);
    }

    console.log(error.config);
    return Promise.reject(error);
  }
);

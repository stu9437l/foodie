import axios from 'axios';
import { AxiosInstance } from './lib/axios';

const login = async (values: { email: string; password: string }) => {
  try {
    const endPoint = process.env.NEXT_PUBLIC_API_LOGIN;
    console.log({ env: endPoint });
    if (!endPoint) {
      throw new Error('Login API URL is not defined!');
    }

    console.log({ values });
    const response = await axios.post(`http://localhost:3000${endPoint}`, values);
    console.log({ response });
    const { data, status } = response;

    if (data !== null && status) {
      return data;
    } else {
      console.error('Unexpected response:', { status, data });
    }
    console.log({ response });
  } catch (err) {
    console.error('Login Error :' + err);

    throw err;
  }
};

  const getFoodStat = async () => {
  try {
    const endPoint = process.env.NEXT_PUBLIC_API_FOOD_CATEGORY;
    console.log({ env: endPoint });
    if (!endPoint) {
      throw new Error('Food category URL is not defined!');
    }

    const response = await AxiosInstance.get(`${endPoint}`);
    console.log({ response });
    const { data, status } = response;

    if (data !== null && status) {
      return data;
    } else {
      console.error('Unexpected response:', { status, data });
    }
    console.log({ response });
  } catch (err) {
    console.error('Login Error :' + err);

    throw err;
  }
};

export { login, getFoodStat };

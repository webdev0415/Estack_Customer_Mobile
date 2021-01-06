import axios from 'axios';

// const PROD_URL = 'http://estackk-api-lb-925393001.ap-southeast-1.elb.amazonaws.com'
const PROD_URL = 'https://staging-api.estackk.com'
const RASPBERRY_PI_URL = 'https://3d3067d8de57.ngrok.io' // STAGING - remote dev server... if production api not work - use this url;

const axiosInstance = axios.create({
  baseURL: PROD_URL,
  timeout: 7000,
});

export const setAuthHeader = (accessToken) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const resetAuthHeader = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

export default axiosInstance;

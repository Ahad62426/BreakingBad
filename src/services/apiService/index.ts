import axios from 'axios';
import { BASE_URL } from '../../constants';
// import { IUser } from '../redux/authReducer/auth.interface';
// import { getObjectData, StorageKeys } from '../utils/async.storage';

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(async function (config) {
  // const user = await getObjectData<IUser>(StorageKeys.user);
  // if (user?.id && config?.headers) {
  //   config.headers.Authorization = user?.id;
  //   config.headers['Content-Type'] = 'application/json';
  // }
  if (config?.headers) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(JSON.stringify(error.response));
  },
);

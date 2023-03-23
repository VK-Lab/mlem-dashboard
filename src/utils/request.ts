import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { i18n } from 'next-i18next';
import qs from 'qs';
import { toast } from 'react-toastify';

import { Config } from '@/config';
import { CookieKeys } from '@/enums/cookieKeys.enum';

const request = axios.create({
  baseURL: Config.apiBaseUrl,
  timeout: 100 * 1000,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
  },
  withCredentials: true,
});

// request interceptor
request.interceptors.request.use((axiosConfig: AxiosRequestConfig) => {
  axiosConfig.headers = {
    ...axiosConfig.headers,
    Authorization: `Bearer ${Cookies.get(CookieKeys.TOKEN)}`,
  };

  return axiosConfig;
});

request.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    const { status } = error.response;

    if (status === 400) {
      const {
        data: { message },
      } = error.response;

      toast.error(
        i18n?.t(
          `apiError.${message}`,
          `Oops, something went wrong please check your network`
        ) as string
      );
    }

    return Promise.reject(error);
  }
);

export default request;

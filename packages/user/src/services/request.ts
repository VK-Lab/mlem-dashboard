import { Config } from "@mlem-user/config";
import { CookieKeys } from "@mlem-user/enums/cookieKeys";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import qs from "qs";

const request = axios.create({
  baseURL: Config.apiBaseUrl,
  timeout: 100 * 1000,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "brackets" }),
  },
  withCredentials: true,
});

// request interceptor
// eslint-disable-next-line @typescript-eslint/no-explicit-any
request.interceptors.request.use((axiosConfig: any) => {
  axiosConfig.headers = {
    ...axiosConfig.headers,
    Authorization: `Bearer ${Cookies.get(CookieKeys.TOKEN)}`,
  };

  return axiosConfig;
});

request.interceptors.response.use((response: AxiosResponse) => response.data);

export default request;

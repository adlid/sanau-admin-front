import axios, { AxiosRequestConfig } from "axios";

const responseInterceptionConfigOverride = (error: any, instanceRefresh: any, instanceRequest: any) => {
  const originalRequest = error.config;

  if (error?.response?.status === 403 && !originalRequest._retry) {
    return Promise.reject(error);
  }

  if (error?.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      return instanceRefresh.post(`/account/refresh/token`, { refreshToken }).then((res: any) => {
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.accessToken || "");
          localStorage.setItem("refreshToken", res.data.refreshToken || "");
          localStorage.setItem("role", res.data.roleName || "");

          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          return instanceRequest(originalRequest);
        }
      });
    } else {
      return Promise.reject(error);
    }
  } else {
    return Promise.reject(error);
  }
};

// автодобавление токена в заголовок запроса
const autoAddToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const accessToken: string | null = `Bearer ${localStorage.getItem("accessToken")}`;
  if (accessToken) config.headers.Authorization = accessToken;
  return { ...config };
};

// обычные json-запросы
const _axiosInstanceJSON = axios.create({
  baseURL:"http://37.151.26.54:8085" + "/api/v1",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

_axiosInstanceJSON.interceptors.request.use(autoAddToken);

// обновление токена
_axiosInstanceJSON.interceptors.response.use(
  (response) => response,
  (config) => responseInterceptionConfigOverride(config, _axiosInstanceJSON, _axiosInstanceJSON)
);

export const instance = _axiosInstanceJSON;

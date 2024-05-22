import axios from 'axios';
import { store } from '../redux/store.js';
import { doLogout, updateAT } from '../redux/action/userAction.js';
import axiosRetry from 'axios-retry';
const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

axiosRetry(instance, {
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    },
    retryCondition: (error) => {
        return error.response.data.name === 'TokenExpiredError';
    },
});
// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        const accessToken = store?.getState()?.user?.account?.access_token;
        config.headers['token'] = 'Bearer ' + accessToken;

        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.data.name === 'TokenExpiredError') {
            console.log(0);

            try {
                const refreshToken = store?.getState()?.user?.account?.refresh_token;

                const response = await axios.post('http://localhost:3000/auth/refresh-token', {
                    refreshToken,
                });
                console.log(response);

                const { accessToken } = response.data;

                store.dispatch(updateAT({ accessToken }));
                // Retry the original request with the new token
                // originalRequest.headers.token = `Bearer ${accessToken}`;
                // return axios(originalRequest);
            } catch (error) {
                store.dispatch(doLogout({}));
                // Handle refresh token error or redirect to login
            }
        }

        return Promise.reject(error);
    },
);

export default instance;

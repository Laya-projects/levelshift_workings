import axios from 'axios';

// 1. Create a configured Axios instance
export const http = axios.create({
    baseURL: 'https://typicode.com', // Your API base domain
    timeout: 8000, // 8-second request timeout limit
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Global Request Interceptor (e.g., Injecting JWT Tokens)
http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Injects token if it exists
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Global Response Interceptor (e.g., Global Error Handling / Logouts)
http.interceptors.response.use(
    (response) => {
        // Axios puts data in response.data. We can return it directly to save typing!
        return response.data;
    },
    (error) => {
        // Catch global server errors like 401 Unauthorized globally
        if (error.response?.status === 401) {
            console.warn('Unauthorized! Redirecting to login...');
            // localStorage.removeItem('token');
            // window.location.href = '/login';
        }

        // Pass the standard error message down to the component .catch block
        const customError = new Error(error.response?.data?.message || error.message);
        return Promise.reject(customError);
    }
);

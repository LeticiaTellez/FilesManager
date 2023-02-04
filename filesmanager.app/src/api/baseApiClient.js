import axios from "axios"
import { apiConfig } from "../config/apiConfig";

const baseApiClient = axios.create({
    baseURL: apiConfig.webApi,
});

export const baseBlobApiClient = axios.create({
    baseURL: apiConfig.webApi,
    responseType: "blob"
});


export const registerDefaults = (accessToken) => {
    baseApiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    baseBlobApiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

baseApiClient.interceptors.response.use((response) => {
    // Return directly the data no need to check status code here
    // This help not having to do response.data everytime.
    return response.data;
}, (error) => {

    // Handling of 400, 404 and 500 are done in App.js
    return Promise.reject(error);
});

baseBlobApiClient.interceptors.response.use((response) => {
    // Return directly the data no need to check status code here
    // This help not having to do response.data everytime.
    return response.data;
}, (error) => {

    // Handling of 400, 404 and 500 are done in App.js
    return Promise.reject(error);
});

export default baseApiClient
import axios from 'axios';

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config.js';
import { responsiveFontSizes } from '@mui/material';

const API_URL = "http://localhost:8080";

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)


axiosInstance.interceptors.response.use(
    function (response) {
        //stop global loader
        return processRespnose(response);
    },
    function (error) {
        //stop global loader
        return Promise.reject(processError(error));
    }
)

///////////////////////////
// if success -> return {isSuccess:true, data:object}
// if fail -> return {isFailure: true, status:string ,msg: string , code:int}

const processRespnose = (response) => {
    if (response?.status == 200) {
        return {
            isSucess: true,
            data: response.data
        }
    }
    else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const processError = (error) => {
    if (error.response) {
        console.log(`Error in response: `, error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }
    else if (error.request) {
        console.log(`Error in request: `, error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: ""
        }
    }
    else {
        console.log(`Error in network: `, error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => {
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            }
        }
        )
    }
}

export {API};
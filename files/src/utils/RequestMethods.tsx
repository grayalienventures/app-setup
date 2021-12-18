import * as React from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import _ from 'lodash'
import wp from '../utils/wp'
import { store } from '../redux/store';
import { logOut, loginSuccess, updateUserData, actionLoginSuccess } from '../redux/actions/authActions';
import config from '../constants/config';
import { keyGenerator, withQuery } from '../utils';


import AsyncStorage from '@react-native-community/async-storage'

import moment from 'moment';
import { Platform } from 'react-native';

export const InstanceAxios = axios.create({
    baseURL: config.url.wpJson,
})

enum RequestmMethods {
    GET, POST, DELETE, PATCH, PUT
}


// Add a request interceptor
InstanceAxios.interceptors.request.use(async (config) => {
    let token = await AsyncStorage.getItem("token")
    if (token && token != "") {
        config.headers = {
            ...config.headers, ...{
                'Authorization': `Bearer ${token}`
            }
        }
    }
    const methodReadAble = ['GET', 'get', 'DELETE', 'delete']
    if (methodReadAble.includes(config.method) && config.data && _.isObject(config.data)) {
        config.url = withQuery(config.url, config.data)
        if (Platform.OS == "ios") {
            config.data = null
        }
    }

    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

/**
 * handle throw if Unauthorized 
 * hook refresh token when expired
 */
InstanceAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (axios.isCancel(error)) {
            return "axios request cancelled";
        }
        const originalRequest = error.config;
        const status = error && error.response && error.response.status
        let refresh_token = await AsyncStorage.getItem("refreshToken");

        if (refresh_token && status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            AsyncStorage.setItem("refreshTokenIsLoading", "true");

            return fetchRefreshToken(refresh_token)
                .then((res) => {
                    console.log("fetchRefreshToken", res)
                    if (res && res.status === 200 && res.data) {
                        console.log("jwt token refreshed!");
                        let newConfig = {
                            ...originalRequest, ...{
                                headers: { ...originalRequest.headers, ...{ 'Authorization': `Bearer ${res.data.token}` } },
                            }
                        }
                        AsyncStorage.removeItem("refreshTokenIsLoading");
                        return axios(newConfig);
                    }
                }).catch((error) => {
                    AsyncStorage.removeItem("refreshTokenIsLoading");
                    return Promise.reject(error);
                })
        }
        return Promise.reject(handleErrorResponse(error));
    }
);


const fetchRefreshToken = (token) => {

    return axios({
        method: "POST",
        headers: { 'Authorization': `Bearer ${token}` },
        data: {},
        url: `${config.url.auth.refresh}`,
    }).then((res) => {
        if (res && res.data) {
            const data = res.data

            store.dispatch(actionLoginSuccess(res.data))
            updateUserData()
        }
        return res;
    }).catch((error) => {
        if (error.response) {
            const regex = /^\b(rest_authentication_)/g;
            if ((error.response.status == 403 || error.response.status == 401) && error.response.data.code && regex.test(error.response.data.code)) {
                /**
                 * logout
                 */
                logOut(true)
            }
        }
        throw new Error(error)
    })

}

/**
 * handelErrorReponse
 * @param error 
 */
const handleErrorResponse = (error) => {
    if (error.response) {
        if (error.response.data && error.response.data.code && error.response.data.message) {
            const regex = /^[[][jwt_auth]+[\]]/g;
            if (regex.test(error.response.data.code)) {
                throw new Error(restMessageError(error.response.data.message));
            }
        }
        if (error.response.status == 403) {
            throw error;
        }
        if (error.response.data && error.response.data.message) {
            throw new Error(restMessageError(error.response.data.message));
        }

    } else if (error.request) {
        throw new Error("The request was made but no response was received");

    } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(error.message);
    }
}

/**
 * remove <Tags></Tangs> 
 * @param message 
 */
const restMessageError = (message: string = ""): string => {
    const regexRemoveTags = /(<([^>]+)>)/ig;
    message = message.replace(regexRemoveTags, '')
    // message = message.replace(/\b(Error:)/g, '')
    return message
}

/**
 * 
 * @param {Blob} file 
 * @param {altText='',caption='',description=''} options 
 */
export const uploadFileServer = async (file, options = { altText: '', caption: '', description: '' }) => {

    const token = await AsyncStorage.getItem("token")
    let _options = {
        altText: '',
        caption: '',
        description: '',
    }
    _options = { ..._options, ...options }
    try {
        let response = await wp.media()
            .setHeaders({
                Authorization: `Bearer ${token}`,
            })
            // Specify a path to the file you want to upload, or a Buffer
            .file(file)
            .create({
                title: file.name,
                alt_text: _options.altText,
                caption: _options.caption,
                description: options.description,
            })
            .then(function (res) {
                // Your media is now uploaded: let's associate it with a post
                return res;
            })

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}


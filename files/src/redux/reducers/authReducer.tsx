import {
    ActionT,
    LOGIN_SUCCESS,
    LOG_OUT,
    GET_ADDRESS_USER,
    UPDATE_USER_DATA
} from '../actions/actionsType';

import AsyncStorage from '@react-native-community/async-storage'
import { UserT, CoordinateT } from '../../types/Users';
import config from '../../constants/config';
import NavigationService from '../../navigators/NavigationService';



export interface AuthState {
    userData: UserT;
    loading: boolean,
    token: string,
    refreshToken: string,
    successLogin?: boolean,
    socketToken?: string,
    unLockPageMain?: boolean,
    isCheckAuth?: boolean,
    tokenExpires?: number,
    coordinate?: CoordinateT
    fcm_token?: string
}
const authInit: AuthState = {
    loading: false,
    token: null,
    refreshToken: null,
    successLogin: false,
    userData: null,
    socketToken: null,
    unLockPageMain: false,
    isCheckAuth: false,
    tokenExpires: 0,
    coordinate: {
        latitude: config.coordinate.latitude,
        longitude: config.coordinate.latitude,
    }
}
export function authReducer(state: AuthState = authInit, action: ActionT): AuthState {
    switch (action.type) {
        case LOGIN_SUCCESS:
            AsyncStorage.setItem("token", action.payload.token);
            AsyncStorage.setItem("refreshToken", action.payload.refreshToken);
            return {
                ...state,

                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                socketToken: action.payload.token,
                userData: action.payload.userData,
                tokenExpires: action.payload.tokenExpires,
            };

        case LOG_OUT:
            /**
             * clear store token
             */
            AsyncStorage.removeItem("token");
            AsyncStorage.removeItem("refreshToken");
            /*
            / back screen auth
            */
            setTimeout(() => {
                NavigationService.navigate('Auth', {});
            }, 200);


            return {
                ...state,
                token: null,
                refreshToken: null,
                userData: null,
            }

        case UPDATE_USER_DATA:
            return {
                ...state,
                userData: { ...state.userData, ...action.payload }
            }

        default:
            return state;
    }
}

export default authReducer;
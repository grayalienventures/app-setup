import { Platform } from 'react-native';

import localConfig from '../localConfig'
import colors from './colors';
const optionsEndPoint = {
  version: 'v2',
  port: 80,
}

const name = "here-name-project";
const serverEndPoint = "https://www.here-domain/admin";
const urlPro = "https://www.here-domain.com";
const isLocal = localConfig.isLocal === true

const localBaseUrl = localConfig.baseURL ? localConfig.baseURL : localConfig.endpoint

const endpoint = !isLocal ? `${serverEndPoint}/wp-json/wp/${optionsEndPoint.version}` : `${localConfig.endpoint}/wp-json/wp/${optionsEndPoint.version}`;
const urlHome = !isLocal ? `${serverEndPoint}` : `${localConfig.endpoint}`;
const server_socket = !isLocal ? `${urlPro}` : `${localConfig.serverSocket}`;
const wpJson = `${urlHome}/wp-json`;

const isProduction = !isLocal ? true : false

const baseURL = isProduction ? urlPro : localBaseUrl

export default {
  isLocal,
  baseURL,
  name,
  BUNDLE_ID_IOS: "com.reactjs.native.here_id_app_ios",
  BUNDLE_ID_ANDROID: "com.here_id_app_android",
  socialMedia: {
    Facebook: `https://www.facebook.com/${name}/`,
    twitter: `https://twitter.com/${name}`,
    googlePluse: `https://plus.google.com/${name}`,
    yelp: `http://yelp.com/biz/${name}`,
    instagram: `http://instagram.com/${name}/`
  },
  coordinate: {
    latitude: 37.78825,
    longitude: -122.4324,
  },
  fontFamily: {
    header: 'HouseScript',
    text: 'Proxima Soft',
  },
  theme: {
    toolbarDefaultBg: colors.primary,
    headerBackground: '#264348'
  },
  url: {
    home: `${urlHome}`,
    wpJson: `${wpJson}`,
    users: `${wpJson}/wp/v2/users`,
    auth: {
      login: `${wpJson}/wp/v2/token`,
      refresh: `${wpJson}/wp/v2/token/refresh`,
      revoke: `${wpJson}/wp/v2/token/revoke`,
    }

  },
  placeholderTextColor: "rgba(0, 0, 0, 0.42);",
};
import config from "../constants/config";


export const keyGenerator = () => (
    Math.random().toString(36).substr(2, 10)
);
export const randomId = () => {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

export const isObject = (obj) => {
    return (typeof obj === "object" && obj !== null) || typeof obj === "function";
}

export const meterToMailes = (meter) => {
    return parseFloat(`${meter * 0.000621371192}`)
}
export const meterToFeet = (meter) => {
    return parseFloat(`${meter * 3.28084}`)
}



export const durationToDDHHMMSSMS = (duration) => {
    var sec_num = parseInt(duration, 10); // don't forget the second param
    var days = Math.floor(sec_num / 86400);
    var hours = parseInt(('0' + Math.floor(duration / 3600) % 24).slice(-2));
    var minutes = parseInt(('0' + Math.floor(duration / 60) % 60).slice(-2));
    var seconds = parseInt(('0' + duration % 60).slice(-2));

    if (hours < 10) { hours = 0 + hours; }
    if (minutes < 10) { minutes = 0 + minutes; }
    if (seconds < 10) { seconds = 0 + seconds; }
    let daysText = days > 0 ? `${days} days ` : " ";
    let hoursText = hours > 0 ? `${hours} hours ` : " ";
    let minutesText = minutes > 0 ? `${minutes} minutes ` : "";
    return `${daysText}${hoursText}${minutesText}${seconds} seconds`;
}

export const isNumber = (number) => {
    try {
        return number.replace(/[^0-9\.]/g, '')
    } catch (error) {
        console.log("number", number)
        console.warn("" + error)
    }

}



/**
 * capitalize 
 * @param {text} str 
 */
export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


/**
 * withQuery 
 * @param {url} str 
 * @param {params} object json 
 */
export const withQuery = (url, params = {}) => {
    const esc = encodeURIComponent
    let query = Object.keys(params)
        .filter(key => params[key] !== '' && params[key] !== null)
        .map(key => `${esc(key)}=${esc(params[key])}`)
        .join('&')
    query = query.length > 0 ? `?${query}` : ''

    return `${url}${query}`
}


export const copyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}


export const resolveImageUrl = (image: string) => {
    if (image == "") {
        return image
    }

    if (config.isLocal) {

        let urlImage = `${config.baseURL}${image.replace(/^.*\/\/[^\/]+/, '')}`
        return urlImage
    }

    return image
}


export const isEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const validatePassword = (value) => {
    const re = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/i;
    return re.test(value) == false;
}

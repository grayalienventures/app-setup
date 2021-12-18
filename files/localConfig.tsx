const port = "here-socket-port";

const baseURL = "IP_PC"
export default {
    baseURL,
    frontEndUrl: `${baseURL}:${port}`,
    endpoint: `${baseURL}/here-home-url`,
    serverSocket: `${baseURL}:${port}`,
    port: port,
    isLocal: false,
}
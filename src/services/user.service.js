import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/content";

class UserService {
    getPublicContent() {
        return axios.get(`${API_URL}/all`);
    }

    getMonitoring() {
        return axios.get(`${API_URL}/monitoring`, { headers: authHeader() });
    }

    getApp() {
        return axios.get(`${API_URL}/app`, { headers: authHeader() });
    }

    activateApp(appName) {
        return axios.post(`${API_URL}/activate`, { headers: authHeader(), name: appName })
    }

    deActivateApp(appName) {
        return axios.post(`${API_URL}/deactivate`, { headers: authHeader(), name: appName })
    }

    getDevice() {
        return axios.get(`${API_URL}/device`, { headers: authHeader() });
    }

    portConfig(deviceId, portNum, portName) {
        return axios.post(`${API_URL}/portconfig`, { headers: authHeader(), id: deviceId, port: portNum, name: portName })
    }

    getConfig() {
        return axios.get(`${API_URL}/config`, { headers: authHeader() });
    }
}

export default new UserService();
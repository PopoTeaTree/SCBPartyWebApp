import axios from "axios";
import environment from "../environment";
import { LoginFormInterface } from "../interfaces/auth.interface";

const login = (username: string, password: string) => {
    const urlLogin = environment.SERVICE_URL + "/login";
    const requestBody = {
        username: username,
        password: password,
    }
    return axios.post(urlLogin+"?username="+requestBody.username+"&password="+requestBody.password)
}

const logout = (username: string, password: string) => {
    const refreshToken = localStorage.getItem("refreashToken");
    const userId = localStorage.getItem("userId")
    const requestBody = {
        username: username,
        password: password,
    }
}

const authService = {
    login: login,
    logout: logout
}
export default authService;
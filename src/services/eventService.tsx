import axios from "axios";
import environment from "../environment";
import { LoginFormInterface } from "../interfaces/auth.interface";
import httpRequest from "./httpService";

const register = (username: string, password: string) => {
    const requestBody = {
        username: username,
        password: password,
    }
    const urlRegister = environment.SERVICE_URL + "/register";
    return axios.post(urlRegister+"?username="+requestBody.username+"&password="+requestBody.password)
}

const getPartyList = () => {
    const urlPartyList = environment.SERVICE_URL + "/parties";
    return httpRequest.get(urlPartyList);
}

const authService = {
    register: register,
    getPartyList: getPartyList,
}
export default authService;
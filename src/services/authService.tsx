/**
 *  authServiceService.tsx
 *
 *  Manage request API of Login and register
 *
 *  Created by
 *  Thitiporn Sukpartcharoen 
 *
 *  6 Jan 2022
 */
import axios from "axios";
import environment from "../environment";

/**
    * Log in request management
    * @param username    email
	* @param password     	
    * @return authtication token
*/
const login = (username: string, password: string) => {
    const urlLogin = environment.SERVICE_URL + "/login";
    const requestBody = {
        username: username,
        password: password,
    };
    return axios.post(urlLogin+`?username=${username}&password=${password}`);
}
/**
    * Register request management
    * @param username    email
	* @param password     	
*/
const register = (username: string, password: string) => {
    const requestBody = {
        username: username,
        password: password,
    };
    const urlRegister = environment.SERVICE_URL + "/register";
   
    return axios.post(urlRegister+"?username="+requestBody.username+"&password="+requestBody.password);
}
/**
    * logOut management     	
*/
const logout = (password: string) => {
    const userId = localStorage.getItem("userId")
    const requestBody = {
        username: userId,
        password: password,
    }
}

const authService = {
    login: login,
    logout: logout,
    register
}
export default authService;
import axios from "axios";
import environment from "../environment";
import authService from "./authService";

// axios.interceptors.request.use(
//     (config) => {
//     const auth = localStorage.getItem("acessToken");
//     if(auth){
//         config.headers["Authorization"] = auth;
//     }
//     return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

const httpRequest = {
    get: axios.get,
    post: axios.post
}
export default httpRequest;
/**
 *  httpService.tsx
 *
 *  http service for setting API axios with header
 *
 *  Created by
 *  Thitiporn Sukpartcharoen 
 *
 *  6 Jan 2022
 */
import axios from "axios";

/**
  * Set axios with header
*/
axios.interceptors.request.use(
    (config) => {
    const auth = localStorage.getItem("Authorization");
    console.log("Auth: ",auth);
    if(auth){
        config.headers["Authorization"] = auth;
    }
    return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const httpRequest = {
    get: axios.get,
    post: axios.post
}
export default httpRequest;
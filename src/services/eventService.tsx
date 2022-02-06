import axios from "axios";
import environment from "../environment";
import { LoginFormInterface } from "../interfaces/auth.interface";

const eventService = {
    getPartyList(){
        const urlPartyList = environment.SERVICE_URL + "/partylist";
        let auth = localStorage.getItem("Authorization");
        console.log("Auth: ",auth);
        return axios.get( urlPartyList, {
            headers: {
              'Authorization': `${auth}`
            }
        })
        // return httpRequest.get(urlPartyList);
    },

    createNewParty(name: string, amount: Number){
        const urlPartyList = environment.SERVICE_URL + "/create";
        let auth = localStorage.getItem("Authorization");
        console.log("Auth: ",auth);
        return axios.post(urlPartyList+"?partyName="+name+"&amount="+amount,{
            headers: {
              'Authorization': `${auth}`
            }
        })
        // return httpRequest.post(urlPartyList+"?partyName="+name+"&amount="+amount);
    },

    joinAParty(partyKey: string){
        const urlJoinParty = environment.SERVICE_URL + "/join";
        let userKey = localStorage.getItem("userId");
        let auth = localStorage.getItem("Authorization");
        console.log("Auth: ",auth);
        return axios.post( urlJoinParty+"?partyKey="+partyKey+"&userKey="+userKey,{
            headers: {
              'Authorization': `${auth}`
            }
        })
        // return httpRequest.post(urlJoinParty+"?partyKey="+partyKey+"&userKey="+userKey);
    }
    
}

export default eventService;
import environment from "../environment";
import { LoginFormInterface } from "../interfaces/auth.interface";
import httpRequest from "./httpService";
const eventService = {
    getPartyList(){
        const urlPartyList = environment.SERVICE_URL + "/partylist";
        return httpRequest.get(urlPartyList);
    },

    createNewParty(name: string, amount: Number){
        const urlPartyList = environment.SERVICE_URL + "/create";
        return httpRequest.post(urlPartyList+"?partyName="+name+"&amount="+amount);
    },

    joinAParty(partyKey: string){
        const urlJoinParty = environment.SERVICE_URL + "/join";
        let userKey = localStorage.getItem("userId");
        return httpRequest.post(urlJoinParty+"?partyKey="+partyKey+"&userKey="+userKey);
    }
    
}

export default eventService;
/**
 *  eventService.tsx
 *
 *  Manage service with Axio
 *
 *  Created by
 *  Thitiporn Sukpartcharoen 
 *
 *  6 Jan 2022
 */
import axios from "axios";
import environment from "../environment";

const eventService = {
    /**
     * Get party list
     */
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

    /**
     * Create new a party
     * @param name      party name
	 * @param amount    maximum amount of member 	
     * @return authtication token
     */
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

    /**
     * Join a party
     * @param partyKey      party key	
     */
    joinAParty(partyKey: string){
        const urlJoinParty = environment.SERVICE_URL + "/join";
        // get user key
        let userKey = localStorage.getItem("userId");
        // get token authtication
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
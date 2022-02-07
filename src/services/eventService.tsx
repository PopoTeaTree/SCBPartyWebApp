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

const auth = localStorage.getItem("Authorization");
const header = {
    'Authorization': `${auth}`
}
const config = {
    headers: { Authorization: `${auth}` }
};

const eventService = {
    /**
     * Get party list
     */
    getPartyList(){
        const urlPartyList = environment.SERVICE_URL + "/partylist";
        return axios.get( urlPartyList, { headers: header } );
    },

    /**
     * Create new a party
     * @param name      party name
	 * @param amount    maximum amount of member 	
     * @return authtication token
     */
    createNewParty(name: string, amount: Number){
        const urlCreate = environment.SERVICE_URL + "/create"+"?partyName="+name+"&amount="+amount;
        const bodyParameters = {
            partyName: name,
            amount: amount
         };
        return axios.post(
            urlCreate,
            bodyParameters,
            config
        ) 
    },

    /**
     * Join a party
     * @param partyKey party key	
     */
    joinAParty(partyKey: string){
        // get user key
        let userKey = localStorage.getItem("userId");
        const urlJoinParty = environment.SERVICE_URL + "/join"+"?partyKey="+partyKey+"&userKey="+userKey;
        const bodyParameters = {
            partyKey: partyKey,
            userKey: userKey
         };
        return axios.post(
            urlJoinParty,
            bodyParameters,
            config
        ) 
    }
    
}

export default eventService;
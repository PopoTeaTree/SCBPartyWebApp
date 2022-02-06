import environment from "../environment";
import { LoginFormInterface } from "../interfaces/auth.interface";
import httpRequest from "./httpService";

const getPartyList = () => {
    const urlPartyList = environment.SERVICE_URL + "/parties";
    return httpRequest.get(urlPartyList);
}

const createParty = (name: string, amount: Number) => {
    const urlPartyList = environment.SERVICE_URL + "/create";
    console.log("Heeeeeeeee: ",name,amount)
    return httpRequest.post(urlPartyList+"?partyName="+name+"&amount="+amount);
}

const joinParty = (partyKey: string) => {
    const urlJoinParty = environment.SERVICE_URL + "/join";
    let userKey = localStorage.getItem("userId");
    return httpRequest.post(urlJoinParty+"?partyKey="+partyKey+"&userKey="+userKey);
}

const eventService = {
    getPartyList: getPartyList,
    createParty: createParty,
    joinParty: joinParty
}
export default eventService;
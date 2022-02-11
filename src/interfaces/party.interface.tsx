/**
 *  party.interface.tsx
 *
 *  party inteface
 *
 *  Created by
 *  Thitiporn Sukpartcharoen 
 *
 *  6 Jan 2022
 */
export interface PartyInterface {
    id: number,
    /** party key */
    keyParty?: string,
    /** party name */
    partyName?: string,
    /** the maximunm of member to join */
    maxAmount?: number,
    /** amount of joined member */
    member?: number
}

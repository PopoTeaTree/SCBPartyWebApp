export interface PartyInterface {
    id?: string,
    key?: string,
    partyName?: string,
    amount?: number,
    member?: string
}

export interface PartyListnterface {
    id?: string,
    key?: string,
    partyName?: string,
    amount?: number | string,
    member?: number | string
}
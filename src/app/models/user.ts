import { Exchange } from './exchange';

export class User {
    constructor (
    public username?: string,
    public password?: string,
    public email?: string,
    public _id?: string,
    public currentExchanges?: Exchange[],
    public pastExchanges?: Exchange[],
    public ownedExchanges?: Exchange[]
  ) { }
}

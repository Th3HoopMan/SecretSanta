import { User } from './user';

export class Exchange {

  constructor(
    public name?: string,
    public startDate?: string,
    public matchDate?: string,
    public endDate?: string,
    public privacy?: boolean,
    public owner?: string,
    public _id?: string,
    public description?: string,
    public maxParticipants?: number,
    public usersParticipating?: string[]
  ) { }

}

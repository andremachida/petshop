import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  active: boolean;
  roles: string[];
}

export class User {
  constructor(
    public username: string,
    public password: string,
    public active: boolean,
    public roles: string[],
  ) {}
}

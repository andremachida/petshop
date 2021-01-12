import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  active: boolean;
}

export class User {
  constructor(
    public username: string,
    public password: string,
    public active: boolean,
  ) {}
}

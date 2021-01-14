import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUser, User } from 'src/modules/backoffice/models/user.model';

@Injectable()
export class AccountService {
  constructor(@InjectModel('User') private readonly model: Model<IUser>) {}

  async create(data: User): Promise<User> {
    const user = new this.model(data);

    return await user.save();
  }
}

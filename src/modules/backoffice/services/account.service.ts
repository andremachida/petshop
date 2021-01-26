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

  async findByUsername(username): Promise<User> {
    return await this.model.findOne({ username: username }).exec();
  }

  // async update(username: string, data: any): Promise<User> {
  //   return await this.model.findOneAndUpdate({ username }, data);
  // }

  // async authenticate(username, password): Promise<Customer> {
  //   const customer = await this.customerModel
  //     .findOne({ document: username })
  //     .populate('user')
  //     .exec();

  //   const pass = await Md5.init(`${password}${process.env.SALT_KEY}`);
  //   if (pass.toString() == customer.user.password.toString()) {
  //     return customer;
  //   } else {
  //     return null;
  //   }
  // }
}

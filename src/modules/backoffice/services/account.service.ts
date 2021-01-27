import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Md5 } from 'md5-typescript';
import { Model } from 'mongoose';

import { IUser, User } from 'src/modules/backoffice/models/user.model';
import { Customer, ICustomer } from '../models/customer.model';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    @InjectModel('Customer') private readonly customerModel: Model<ICustomer>,
  ) {}

  async create(data: User): Promise<User> {
    const user = new this.userModel(data);

    return await user.save();
  }

  async update(document: string, data: any): Promise<User> {
    return await this.userModel.findOneAndUpdate({ document }, data);
  }

  async authenticate(username: string, password: string): Promise<Customer> {
    const customer = await this.customerModel
      .findOne({ document: username })
      .populate('user')
      .exec();

    const pass = Md5.init(`${password}${process.env.SALT_KEY}`);
    if (pass.toString() == customer.user.password.toString()) {
      return customer;
    } else {
      return null;
    }
  }
}

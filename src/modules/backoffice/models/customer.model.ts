import { Document } from 'mongoose';

import { Pet } from './pet.model';
import { Address } from './address.model';
import { CreditCard } from './credit-card.model';
import { User } from './user.model';

export interface ICustomer extends Document {
  name: string;
  document: string;
  email: string;
  pets: Pet[];
  billingAddress: Address;
  shippingAddress: Address;
  creditCard: CreditCard;
  user: User;
}

export class Customer {
  constructor(
    public name: string,
    public document: string,
    public email: string,
    public pets: Pet[],
    public billingAddress: Address,
    public shippingAddress: Address,
    public creditCard: CreditCard,
    public user: User,
  ) {}
}

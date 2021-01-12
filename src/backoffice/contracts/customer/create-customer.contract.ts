import { Injectable } from '@nestjs/common';

import { Contract } from '../contract';
import { Flunt } from '../../../utils/flunt';
import { CreateCustomerDto } from '../../dtos/create-customer.dto';

@Injectable()
export class CreateCustomerContract implements Contract {
  errors: any[];
  validate(model: CreateCustomerDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Name Invalid');
    flunt.isEmail(model.email, 'Email Invalid');
    flunt.isFixedLen(model.document, 11, 'Document Invalid');
    flunt.hasMinLen(model.password, 6, 'Password Invalid');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}

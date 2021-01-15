import { Injectable } from '@nestjs/common';

import { Contract } from '../contract';
import { Flunt } from '../../../../utils/flunt';
import { UpdateCustomerDto } from '../../dtos/customer/update-customer.dto';

@Injectable()
export class UpdateCustomerContract implements Contract {
  errors: any[];
  validate(model: UpdateCustomerDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Name Invalid');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}

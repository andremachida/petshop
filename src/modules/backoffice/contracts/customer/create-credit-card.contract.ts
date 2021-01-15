import { Injectable } from '@nestjs/common';

import { Contract } from '../contract';
import { Flunt } from '../../../../utils/flunt';
import { CreditCard } from '../../models/credit-card.model';

@Injectable()
export class CreateCreditCardContract implements Contract {
  errors: any[];
  validate(model: CreditCard): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.holder, 5, 'Holder Invalid');
    flunt.isFixedLen(model.number, 16, 'Number Invalid');
    flunt.isFixedLen(model.expiration, 4, 'Expiration Invalid');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}

import { Injectable } from '@nestjs/common';

import { Contract } from '../contract';
import { Flunt } from '../../../../utils/flunt';

import { Address } from 'src/modules/backoffice/models/address.model';

@Injectable()
export class CreateAddressContract implements Contract {
  errors: any[];
  validate(model: Address): boolean {
    const flunt = new Flunt();

    flunt.isFixedLen(model.zipCode, 8, 'ZipCode Invalid');
    flunt.hasMinLen(model.street, 3, 'Street Invalid');
    flunt.hasMinLen(model.neighborhood, 3, 'Neighborhood Invalid');
    flunt.hasMinLen(model.city, 3, 'City Invalid');
    flunt.isFixedLen(model.state, 2, 'State Invalid');
    flunt.isFixedLen(model.country, 3, 'Country Invalid');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}

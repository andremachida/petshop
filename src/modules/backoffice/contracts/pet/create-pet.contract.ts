import { Injectable } from '@nestjs/common';

import { Contract } from '../contract';
import { Flunt } from '../../../../utils/flunt';

import { Pet } from 'src/modules/backoffice/models/pet.model';

@Injectable()
export class CreatePetContract implements Contract {
  errors: any[];
  validate(model: Pet): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 2, 'Name Invalid');
    flunt.hasMinLen(model.gender, 3, 'Gender Invalid');
    flunt.hasMinLen(model.kind, 3, 'Kind Invalid');
    flunt.hasMinLen(model.brand, 3, 'Brand Invalid');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}

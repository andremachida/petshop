import { Injectable } from '@nestjs/common';

import { Contract } from './contract';
import { Flunt } from './../../../utils/flunt';
import { QueryDto } from '../dtos/query.dto';

@Injectable()
export class QueryContract implements Contract {
  errors: any[];
  validate(model: QueryDto): boolean {
    const flunt = new Flunt();

    flunt.isGreaterThan(model.take, 100, 'Query take cant be greater than 100');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}

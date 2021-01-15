import {
  Controller,
  Post,
  Put,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../../interceptors/validator.interceptor';
import { CreatePetContract } from '../contracts/pet/create-pet.contract';
import { Pet } from '../models/pet.model';
import { PetService } from '../services/pet.service';

@Controller('v1/pets')
export class PetController {
  constructor(private readonly service: PetService) {}
  @Post(':document')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async createPet(@Param('document') document: string, @Body() model: Pet) {
    try {
      const customer = await this.service.create(document, model);
      return new Result('Created pet', true, customer, null);
    } catch (error) {
      throw new HttpException(
        new Result('Unable to create pet', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':document/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async updatePet(
    @Param('document') document: string,
    @Param('id') id: string,
    @Body() model: Pet,
  ) {
    try {
      await this.service.update(document, id, model);
      return new Result('Updated pet', true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Unable to update pet', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

import {
  Controller,
  Post,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../../interceptors/validator.interceptor';
import { CreateAddressContract } from '../contracts/address/create-address.contract';
import { Address } from '../models/address.model';
import { AddressService } from '../services/address.service';
import { AddressType } from '../enums/address-type.enum';

@Controller('v1/addresses')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Post(':document/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(
    @Param('document') document: string,
    @Body() model: Address,
  ) {
    try {
      await this.service.create(document, model, AddressType.Billing);
      return new Result('Created billing address', true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Unable to create billing address', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShippingAddress(
    @Param('document') document: string,
    @Body() model: Address,
  ) {
    try {
      await this.service.create(document, model, AddressType.Shipping);
      return new Result('Created shipping address', true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Unable to create shipping address', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

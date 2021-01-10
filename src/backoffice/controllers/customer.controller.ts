import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer.contract';
import { CreateCustomerDto } from '../dtos/create-customer.dto';

@Controller('v1/customers')
export class CustomerController {
  @Get()
  get() {
    return 'get';
  }

  @Get(':document')
  getById(@Param('document') document: string) {
    return new Result(null, true, { document }, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  post(@Body() body: CreateCustomerDto) {
    return new Result('Customer created', true, body, null);
  }

  @Put(':document')
  put(@Param('document') document: string, @Body() body: Customer) {
    return new Result('Customer updated', true, body, null);
  }

  @Delete(':document')
  delete(@Param('document') document: string) {
    return new Result('Customer removed', true, { document }, null);
  }
}

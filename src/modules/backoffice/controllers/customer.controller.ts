import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../../interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { CreateCustomerDto } from '../dtos/customer/create-customer.dto';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { CustomerService } from '../services/customer.service';
import { QueryDto } from '../dtos/query.dto';
import { UpdateCustomerContract } from '../contracts/customer/update-customer.contract';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';
import { CreateCreditCardContract } from '../contracts/customer/create-credit-card.contract';
import { CreditCard } from '../models/credit-card.model';
import { QueryContract } from '../contracts/query.contract';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
  ) {}

  @Get()
  async getAll() {
    const customers = await this.customerService.findAll();
    return new Result('Customer list', true, customers, null);
  }

  @Get(':document')
  async get(@Param('document') document: string) {
    const customer = await this.customerService.find(document);
    return new Result('Customer', true, customer, null);
  }

  @Post('query')
  @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
  async query(@Body() model: QueryDto) {
    const customers = await this.customerService.query(model);
    return new Result('Query', true, customers, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto) {
    try {
      const user = await this.accountService.create(
        new User(model.document, model.password, true),
      );

      const customer = new Customer(
        model.name,
        model.document,
        model.email,
        [],
        null,
        null,
        null,
        user,
      );

      const response = await this.customerService.create(customer);

      return new Result('Customer created', true, response, null);
    } catch (error) {
      throw new HttpException(
        new Result('Unable to create customer', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/credit-cards')
  @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
  async createCreditCard(
    @Param('document') document: string,
    @Body() model: CreditCard,
  ) {
    try {
      await this.customerService.saveOrUpdateCreditCard(document, model);
      return new Result('Created credit card', true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Unable to create credit card', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':document')
  @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
  async update(
    @Param('document') document: string,
    @Body() model: UpdateCustomerDto,
  ) {
    try {
      await this.customerService.update(document, model);
      return new Result('Customer updated', true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Unable to update customer', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':document')
  delete(@Param('document') document: string) {
    return new Result('Customer removed', true, { document }, null);
  }
}

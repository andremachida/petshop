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
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { CustomerService } from '../services/customer.service';
import { CreateAddressContract } from '../contracts/customer/create-address.contract';
import { Address } from '../models/address.model';
import { CreatePetContract } from '../contracts/customer/create-pet.contract';
import { Pet } from '../models/pet.model';
import { QueryDto } from '../dtos/query.dto';

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

  @Post(':document/addresses/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(
    @Param('document') document: string,
    @Body() model: Address,
  ) {
    try {
      await this.customerService.addBillingAddress(document, model);
      return new Result('Created billing address', true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Unable to create billing address', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/addresses/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShippingAddress(
    @Param('document') document: string,
    @Body() model: Address,
  ) {
    try {
      await this.customerService.addShippingAddress(document, model);
      return new Result('Created shipping address', true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Unable to create shipping address', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/pets')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async createPet(@Param('document') document: string, @Body() model: Pet) {
    try {
      const customer = await this.customerService.createPet(document, model);
      return new Result('Created pet', true, customer, null);
    } catch (error) {
      throw new HttpException(
        new Result('Unable to create pet', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':document/pets/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async updatePet(
    @Param('document') document: string,
    @Param('id') id: string,
    @Body() model: Pet,
  ) {
    try {
      await this.customerService.updatePet(document, id, model);
      return new Result('Updated pet', true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Unable to update pet', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
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

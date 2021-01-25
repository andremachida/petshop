import {
  Controller,
  HttpException,
  HttpStatus,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';
import { Result } from 'src/modules/backoffice/models/result.model';

@Controller('v1/products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async get() {
    try {
      const products = await this.service.get();
      return new Result(null, true, products, null);
    } catch (error) {
      throw new HttpException(
        new Result('Unable to list products', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async post(@Body() model: Product) {
    try {
      await this.service.post(model);
      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Unable to create product', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async put(@Param('id') id, @Body() model: Product) {
    try {
      await this.service.put(id, model);
      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Unable to update product', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    try {
      await this.service.delete(id);
      return new Result('Product removed', true, null, null);
    } catch (error) {
      throw new HttpException(
        new Result('Unable to remove product', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

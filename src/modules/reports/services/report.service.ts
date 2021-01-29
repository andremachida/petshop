import { Injectable } from '@nestjs/common';
import { ProductArgs } from '../dtos/product-args.dto';
import { Product } from '../models/product.model';

@Injectable()
export class ReportService {
  async findOneById(id: string): Promise<Product> {
    console.log(id);
    return {
      id: '1',
      title: 'title 1',
      description: 'description 1 desc',
    } as Product;
  }

  async findAll(args: ProductArgs): Promise<Product[]> {
    console.log(args);
    return [
      {
        id: '2',
        title: 'title 2',
        description: 'description 2 desc',
      },
    ] as Product[];
  }
}

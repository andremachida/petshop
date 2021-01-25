import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://petshop:acacia.123@cluster0.ar0ph.mongodb.net/petshop?retryWrites=true&w=majority',
    ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'curso.123',
      database: 'petshop',
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    }),
    BackofficeModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

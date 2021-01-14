import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BackofficeModule } from './modules/backoffice/backoffice.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://petshop:acacia.123@cluster0.ar0ph.mongodb.net/petshop?retryWrites=true&w=majority',
    ),
    BackofficeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

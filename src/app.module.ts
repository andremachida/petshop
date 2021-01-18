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
      host: 'be1wjskyj0cabvtqpwfy-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'ufdbstw8ivlitzqi',
      password: '7tGEmjRa5IMeyegQtxx9',
      database: 'be1wjskyj0cabvtqpwfy',
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: false,
    }),
    BackofficeModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

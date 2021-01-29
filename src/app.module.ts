import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { StoreModule } from './modules/store/store.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { ReportsModule } from './modules/reports/reports.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_CONNECTION_HOST,
      port: parseInt(process.env.MYSQL_CONNECTION_PORT, 10),
      username: process.env.MYSQL_CONNECTION_USERNAME,
      password: process.env.MYSQL_CONNECTION_PASSWORD,
      database: process.env.MYSQL_CONNECTION_DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    }),
    BackofficeModule,
    StoreModule,
    ScheduleModule,
    ReportsModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CommandHandlers } from './commands/handlers';
import { ScheduleController } from './controllers/schedule.controller';
import { EventHandlers } from './events/handlers';
import { RoomRepository } from './repositories/room.repository';
import { RoomBookService } from './services/room-book.service';

@Module({
  imports: [CqrsModule],
  controllers: [ScheduleController],
  providers: [
    RoomBookService,
    RoomRepository,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class ScheduleModule {}

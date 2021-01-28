import { Injectable } from '@nestjs/common';
import { Room } from '../models/room.model';

@Injectable()
export class RoomRepository {
  async checkAvailability(id: string, date: Date): Promise<Room> {
    console.log(id, date);
    return new Room('123456789');
  }

  async book(room: Room) {
    console.log('book ', room);
  }
}

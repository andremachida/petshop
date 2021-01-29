import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  handleConnection(client) {
    client.broadcast.emit('users', {
      user: client.id,
      action: 'connected',
    });
  }

  handleDisconnect(client) {
    client.broadcast.emit('users', {
      user: client.id,
      action: 'disconnected',
    });
  }

  @SubscribeMessage('chat')
  chat(client: any, data: any) {
    client.broadcast.emit('chat', data);
    return data;
  }

  @SubscribeMessage('users')
  users(client: any, data: any) {
    return data;
  }
}

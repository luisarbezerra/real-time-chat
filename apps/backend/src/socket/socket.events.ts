import { Server, Socket } from 'socket.io';
import { Message, User } from '@real-time-chat/shared';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { logger } from '../utils/logger';

export class SocketEvents {
  constructor(
    private io: Server,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  setupSocketEvents(socket: Socket) {
    logger.log(`New connection from socket ${socket.id}`);

    // Send chat history to the new user
    const messages = this.messageService.getMessages();
    socket.emit('chat_history', messages);

    // New message event
    socket.on('new_message', (msg: Omit<Message, 'id' | 'timestamp'>) => {
      logger.log(`New message from socket ${socket.id}`);
      const newMessage = this.messageService.addMessage(msg);
      this.io.emit('new_message', newMessage);
    });

    // User typing event
    socket.on('typing', (user: User) => {
      logger.log(`User ${user.name} started typing`);
      const typingUsers = this.userService.addTypingUser(user);
      socket.broadcast.emit('user_typing', typingUsers);
    });

    // User stopped typing event
    socket.on('stop_typing', (user: User) => {
      logger.log(`User ${user.name} stopped typing`);
      const typingUsers = this.userService.removeTypingUser(user.id);
      socket.broadcast.emit('user_typing', typingUsers);
    });

    // Disconnect event
    socket.on('disconnect', () => {
      logger.log(`Socket ${socket.id} disconnected`);
    });

    // Error handling
    socket.on('error', (error) => {
      logger.error(`Socket error: ${error}`);
    });
  }
}

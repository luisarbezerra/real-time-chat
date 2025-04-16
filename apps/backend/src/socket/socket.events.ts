import { Server, Socket } from 'socket.io';
import { Message, User, SocketEvents } from '@real-time-chat/shared';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { logger } from '../utils/logger';

export class SocketEventsHandler {
  constructor(
    private io: Server,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  setupSocketEvents(socket: Socket) {
    logger.log(`New connection from socket ${socket.id}`);

    // Send chat history to the new user
    const messages = this.messageService.getMessages();
    socket.emit(SocketEvents.CHAT_HISTORY, messages);

    // New message event
    socket.on(
      SocketEvents.NEW_MESSAGE,
      (msg: Omit<Message, 'id' | 'timestamp'>) => {
        logger.log(`New message from socket ${socket.id}`);
        const newMessage = this.messageService.addMessage(msg);
        this.io.emit(SocketEvents.NEW_MESSAGE, newMessage);
      }
    );

    // User typing event
    socket.on(SocketEvents.TYPING, (user: User) => {
      logger.log(`User ${user.name} started typing`);
      const typingUsers = this.userService.addTypingUser(user);
      socket.broadcast.emit(SocketEvents.USER_TYPING, typingUsers);
    });

    // User stopped typing event
    socket.on(SocketEvents.STOP_TYPING, (user: User) => {
      logger.log(`User ${user.name} stopped typing`);
      const typingUsers = this.userService.removeTypingUser(user.id);
      socket.broadcast.emit(SocketEvents.USER_TYPING, typingUsers);
    });

    // Disconnect event
    socket.on(SocketEvents.DISCONNECT, () => {
      logger.log(`Socket ${socket.id} disconnected`);
    });

    // Error handling
    socket.on(SocketEvents.ERROR, (error) => {
      logger.error(`Socket error: ${error}`);
    });
  }
}

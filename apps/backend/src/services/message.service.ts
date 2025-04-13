import { v4 as uuidv4 } from 'uuid';
import { Message } from '@real-time-chat/shared';
import { sanitizeMessage } from '../utils/sanitize';
import { logger } from '../utils/logger';

export class MessageService {
  private messages: Message[] = [];

  addMessage(message: Omit<Message, 'id' | 'timestamp'>): Message {
    logger.log('New message sent');

    const sanitizedMessage = sanitizeMessage(message);
    const newMessage: Message = {
      id: uuidv4(),
      ...sanitizedMessage,
      timestamp: new Date(),
    };

    this.messages.push(newMessage);
    logger.log(`Message added with ID: ${newMessage.id}`);

    return newMessage;
  }

  getMessages(): Message[] {
    logger.log(`Retrieving ${this.messages.length} messages`);
    return this.messages;
  }
}

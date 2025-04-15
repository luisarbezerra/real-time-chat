import { User, Message } from '../types';

export const mockUser: User = {
  id: 'test-user-id',
  name: 'Test User',
};

export const mockMessage: Message = {
  id: 'test-message-id',
  user: mockUser,
  text: 'Test message',
  timestamp: new Date(),
};

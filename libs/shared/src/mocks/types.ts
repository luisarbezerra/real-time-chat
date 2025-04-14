import { User, Message } from '../types/index.js';

export const mockUser: User = {
  id: '1',
  name: 'Test User',
};

export const mockMessage: Message = {
  id: '1',
  user: mockUser,
  text: 'Test message',
  timestamp: new Date(),
};

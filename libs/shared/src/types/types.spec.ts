import { User, Message, SocketEvents } from './index.js';

describe('shared', () => {
  it('should create a user', () => {
    const user: User = {
      id: '1',
      name: 'John Doe',
    };
    expect(user).toEqual({ id: '1', name: 'John Doe' });
  });

  it('should create a message', () => {
    const message: Message = {
      id: '1',
      text: 'Hello, world!',
      user: {
        id: '1',
        name: 'John Doe',
      },
      timestamp: new Date(),
    };
    expect(message).toEqual({
      id: '1',
      text: 'Hello, world!',
      user: { id: '1', name: 'John Doe' },
      timestamp: new Date(),
    });
  });

  it('should have correct socket event values', () => {
    expect(SocketEvents.CONNECT).toBe('connect');
    expect(SocketEvents.DISCONNECT).toBe('disconnect');
    expect(SocketEvents.ERROR).toBe('error');
    expect(SocketEvents.NEW_MESSAGE).toBe('new_message');
    expect(SocketEvents.CHAT_HISTORY).toBe('chat_history');
    expect(SocketEvents.TYPING).toBe('typing');
    expect(SocketEvents.STOP_TYPING).toBe('stop_typing');
    expect(SocketEvents.USER_TYPING).toBe('user_typing');
  });
});

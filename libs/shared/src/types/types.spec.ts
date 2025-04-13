import { User, Message } from './index.js';

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
});

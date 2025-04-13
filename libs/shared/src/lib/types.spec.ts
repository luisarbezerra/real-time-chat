import { User, Message } from '../types/index.js';

describe('shared', () => {
  it('should work', () => {
    const user: User = {
      id: '1',
      name: 'John Doe',
    };
    const message: Message = {
      id: '1',
      text: 'Hello, world!',
      user,
      timestamp: new Date(),
    };
    expect(user).toEqual({ id: '1', name: 'John Doe' });
    expect(message).toEqual({
      id: '1',
      text: 'Hello, world!',
      user: { id: '1', name: 'John Doe' },
      timestamp: new Date(),
    });
  });
});

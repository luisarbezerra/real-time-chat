import { renderHook, act } from '@testing-library/react';
import { useUser } from './useUser';
import { mockUser } from '@real-time-chat/shared';

describe('useUser', () => {
  beforeEach(() => {
    localStorage.setItem('chat_user', JSON.stringify(mockUser));
  });

  it('should initialize with user from localStorage', () => {
    const { result } = renderHook(() => useUser());

    expect(result.current.user).toEqual(mockUser);
  });

  it('should update username and save to localStorage', () => {
    const { result } = renderHook(() => useUser());

    act(() => {
      result.current.updateUsername('New User');
    });

    expect(result.current.user.name).toBe('New User');
    expect(localStorage.getItem('chat_user')).toBe(
      JSON.stringify({
        id: mockUser.id,
        name: 'New User',
      })
    );
  });
});

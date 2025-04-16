import { renderHook, waitFor } from '@testing-library/react';
import { useSocket } from './useSocket';
import { mockUser, mockMessage } from '@real-time-chat/shared';
import io from 'socket.io-client';

// Mock socket.io-client
jest.mock('socket.io-client', () => {
  const mockSocket = {
    on: jest.fn((event, callback) => {
      if (event === 'connect') {
        callback();
      }
    }),
    off: jest.fn(),
    emit: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
  };

  return {
    __esModule: true,
    default: jest.fn(() => mockSocket),
  };
});

describe('useSocket', () => {
  let mockSocket: ReturnType<typeof io> & {
    on: jest.Mock;
    emit: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSocket = io() as ReturnType<typeof io> & {
      on: jest.Mock;
      emit: jest.Mock;
    };
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useSocket(mockUser));

    expect(result.current.messages).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.typingUsers).toEqual([]);
    expect(result.current.isConnected).toBe(true);
  });

  it('should handle chat history', async () => {
    const { result } = renderHook(() => useSocket(mockUser));

    const chatHistoryCallback = mockSocket.on.mock.calls.find(
      (call: [string, (...args: any[]) => void]) => call[0] === 'chat_history'
    )?.[1];

    await waitFor(() => chatHistoryCallback?.([mockMessage]));

    expect(result.current.messages).toEqual([mockMessage]);
  });

  it('should handle new message', async () => {
    const { result } = renderHook(() => useSocket(mockUser));

    const newMessageCallback = mockSocket.on.mock.calls.find(
      (call: [string, (...args: any[]) => void]) => call[0] === 'new_message'
    )?.[1];

    await waitFor(() => newMessageCallback?.(mockMessage));

    expect(result.current.messages).toEqual([mockMessage]);
  });

  it('should handle typing users', async () => {
    const { result } = renderHook(() => useSocket(mockUser));

    // Simulate typing event
    const typingUsersCallback = mockSocket.on.mock.calls.find(
      (call: [string, (...args: any[]) => void]) => call[0] === 'user_typing'
    )?.[1];

    await waitFor(() => typingUsersCallback?.([mockUser]));

    expect(result.current.typingUsers).toEqual([mockUser]);
  });
});

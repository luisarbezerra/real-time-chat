import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatContainer } from './ChatContainer';
import { useUser } from '../../hooks/useUser';
import { useSocket } from '../../hooks/useSocket';
import { mockUser, mockMessage } from '@real-time-chat/shared';

jest.mock('../../hooks/useUser');
jest.mock('../../hooks/useSocket');

describe('ChatContainer', () => {
  const mockUseUser = {
    user: { ...mockUser, name: 'Test User' },
    updateUsername: jest.fn(),
  };

  const mockUseSocket = {
    messages: [mockMessage],
    isLoading: false,
    typingUsers: [],
    handleTyping: jest.fn(),
    sendMessage: jest.fn(),
    isConnected: true,
  };

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue(mockUseUser);
    (useSocket as jest.Mock).mockReturnValue(mockUseSocket);
  });

  it('should render chat container with all components', () => {
    render(<ChatContainer />);

    expect(screen.getByTestId('chat-container')).toBeInTheDocument();
    expect(screen.getByTestId('chat-header')).toBeInTheDocument();
    expect(screen.getByTestId('message-list')).toBeInTheDocument();
    expect(screen.getByTestId('chat-input')).toBeInTheDocument();
  });

  it('should update message when typing', () => {
    render(<ChatContainer />);

    const messageInput = screen.getByRole('textbox', {
      name: /message input/i,
    });
    fireEvent.change(messageInput, { target: { value: 'Hello' } });

    expect(mockUseSocket.handleTyping).toHaveBeenCalled();
  });

  it('should send message when clicking send button', () => {
    render(<ChatContainer />);

    const messageInput = screen.getByRole('textbox', {
      name: /message input/i,
    });
    fireEvent.change(messageInput, { target: { value: 'Hello' } });

    const sendButton = screen.getByTestId('send-button');
    fireEvent.click(sendButton);

    expect(mockUseSocket.sendMessage).toHaveBeenCalledWith('Hello');
  });

  it('should disable input and send button when loading', () => {
    (useSocket as jest.Mock).mockReturnValue({
      ...mockUseSocket,
      isLoading: true,
    });

    render(<ChatContainer />);

    const messageInput = screen.getByRole('textbox', {
      name: /message input/i,
    });
    const sendButton = screen.getByTestId('send-button');

    expect(messageInput).toBeDisabled();
    expect(sendButton).toBeDisabled();
  });

  it('should disable send button when disconnected', () => {
    (useSocket as jest.Mock).mockReturnValue({
      ...mockUseSocket,
      isConnected: false,
    });

    render(<ChatContainer />);

    const sendButton = screen.getByTestId('send-button');
    expect(sendButton).toBeDisabled();
  });

  it('should not send empty message', () => {
    render(<ChatContainer />);

    const messageInput = screen.getByRole('textbox', {
      name: /message input/i,
    });
    fireEvent.change(messageInput, { target: { value: '' } });

    const sendButton = screen.getByTestId('send-button');
    expect(sendButton).toBeDisabled();
  });

  it('should show typing indicator when user is typing', () => {
    const typingUsers = [{ id: 'other-user-id', name: 'Other User' }];
    (useSocket as jest.Mock).mockReturnValue({
      ...mockUseSocket,
      typingUsers,
    });

    render(<ChatContainer />);

    expect(screen.getByTestId('typing-indicator')).toHaveTextContent(
      'Other User is typing...'
    );
  });

  it('should update username and reflect changes', () => {
    render(<ChatContainer />);

    const usernameInput = screen.getByRole('textbox', {
      name: /username input/i,
    });
    fireEvent.change(usernameInput, { target: { value: 'New Username' } });

    expect(mockUseUser.updateUsername).toHaveBeenCalledWith('New Username');
  });

  it('should show connection status correctly', () => {
    (useSocket as jest.Mock).mockReturnValue({
      ...mockUseSocket,
      isConnected: false,
    });

    render(<ChatContainer />);

    expect(screen.getByTestId('connection-indicator')).toHaveTextContent(
      'Disconnected'
    );
  });

  it('should display messages correctly', () => {
    const messages = [
      { ...mockMessage, id: 'message-1', text: 'First message' },
      { ...mockMessage, id: 'message-2', text: 'Second message' },
    ];
    (useSocket as jest.Mock).mockReturnValue({
      ...mockUseSocket,
      messages,
    });

    render(<ChatContainer />);

    expect(screen.getByText('First message')).toBeInTheDocument();
    expect(screen.getByText('Second message')).toBeInTheDocument();
  });

  it('should handle message input with Enter key', () => {
    render(<ChatContainer />);

    const messageInput = screen.getByRole('textbox', {
      name: /message input/i,
    });
    fireEvent.change(messageInput, { target: { value: 'Hello' } });
    fireEvent.keyDown(messageInput, { key: 'Enter', shiftKey: false });

    expect(mockUseSocket.sendMessage).toHaveBeenCalledWith('Hello');
  });
});

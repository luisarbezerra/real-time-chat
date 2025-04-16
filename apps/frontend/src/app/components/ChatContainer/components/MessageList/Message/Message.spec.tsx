import { mockMessage } from '@real-time-chat/shared';
import { render, screen } from '@testing-library/react';
import DOMPurify from 'dompurify';
import React from 'react';

import '@testing-library/jest-dom';
import { Message } from './Message';

// Mock DOMPurify
jest.mock('dompurify', () => ({
  sanitize: jest.fn((text) => `sanitized-${text}`),
}));

describe('Message', () => {
  it('should render message with sanitized content', () => {
    render(<Message message={mockMessage} isSentByCurrentUser={false} />);

    // Verify sanitization was called
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(mockMessage.text);
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(mockMessage.user.name);

    // Verify sanitized content is rendered
    expect(
      screen.getByText(`sanitized-${mockMessage.text}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`sanitized-${mockMessage.user.name}, 10:30 AM`)
    ).toBeInTheDocument();
  });

  it('should apply correct CSS class based on isSentByCurrentUser', () => {
    const { rerender, container } = render(
      <Message message={mockMessage} isSentByCurrentUser={false} />
    );

    // Check for received message class
    const messageElement = container.firstChild as HTMLElement;
    expect(messageElement).toHaveClass('message', 'received');
    expect(messageElement).not.toHaveClass('sent');

    // Rerender with isSentByCurrentUser true
    rerender(<Message message={mockMessage} isSentByCurrentUser={true} />);

    // Check for sent message class
    expect(messageElement).toHaveClass('message', 'sent');
    expect(messageElement).not.toHaveClass('received');
  });

  it('should handle HTML content safely', () => {
    const htmlMessage = {
      ...mockMessage,
      text: '<script>alert("hack")</script>',
    };

    render(<Message message={htmlMessage} isSentByCurrentUser={false} />);

    expect(DOMPurify.sanitize).toHaveBeenCalledWith(
      '<script>alert("hack")</script>'
    );

    expect(screen.getByText('sanitized-')).toBeInTheDocument();
    expect(
      screen.getByText(`sanitized-${mockMessage.user.name}, 10:30 AM`)
    ).toBeInTheDocument();
  });
});

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DOMPurify from 'dompurify';
import React, { useState, useEffect } from 'react';
import './ChatInput.scss';

type ChatInputProps = {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  isSendDisabled: boolean;
  isInputDisabled: boolean;
};

const MAX_MESSAGE_LENGTH = 300;

export const ChatInput = ({
  message,
  onMessageChange,
  onSendMessage,
  isSendDisabled,
  isInputDisabled,
}: ChatInputProps): React.ReactElement => {
  const [showCharLimitWarning, setShowCharLimitWarning] = useState(false);

  useEffect(() => {
    setShowCharLimitWarning(message.length === MAX_MESSAGE_LENGTH);
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handleMessageChange = (value: string): void => {
    const sanitizedValue = DOMPurify.sanitize(value);
    onMessageChange(sanitizedValue);
  };

  return (
    <div className="chat-input" data-testid="chat-input">
      <div className="message-input">
        <textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => handleMessageChange(e.target.value)}
          rows={2}
          maxLength={MAX_MESSAGE_LENGTH}
          onKeyDown={handleKeyDown}
          aria-label="Message input"
          aria-multiline="true"
          disabled={isInputDisabled}
          data-testid="message-textarea"
        />

        {showCharLimitWarning && (
          <div
            className="character-limit-warning"
            aria-label="Character limit warning: 300 characters max"
          >
            {message.length}/{MAX_MESSAGE_LENGTH}
          </div>
        )}
      </div>

      <button
        onClick={onSendMessage}
        disabled={isSendDisabled}
        aria-label="Send message"
        aria-disabled={isSendDisabled}
        tabIndex={0}
        data-testid="send-button"
      >
        <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
      </button>
    </div>
  );
};

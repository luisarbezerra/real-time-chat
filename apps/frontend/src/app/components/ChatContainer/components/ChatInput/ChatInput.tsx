import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import DOMPurify from 'dompurify';
import './ChatInput.scss';

interface ChatInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  isSendDisabled: boolean;
}

export const ChatInput = ({
  message,
  onMessageChange,
  onSendMessage,
  isSendDisabled,
}: ChatInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handleMessageChange = (value: string) => {
    const sanitizedValue = DOMPurify.sanitize(value);
    onMessageChange(sanitizedValue);
  };

  return (
    <div className="chat-input">
      <div className="message-input">
        <textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => handleMessageChange(e.target.value)}
          rows={2}
          maxLength={300}
          onKeyDown={handleKeyDown}
          aria-label="Message input"
          aria-multiline="true"
        />
      </div>
      <button
        onClick={onSendMessage}
        disabled={isSendDisabled}
        aria-label="Send message"
        aria-disabled={isSendDisabled}
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
      </button>
    </div>
  );
};

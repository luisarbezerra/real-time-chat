import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Message } from './Message';
import './MessageList.scss';
import { TypingIndicator } from './TypingIndicator';
import { Message as MessageType, User } from '@real-time-chat/shared';

type MessageListProps = {
  messages: MessageType[];
  user: User;
  isLoading: boolean;
  typingUsers: User[];
};

export const MessageList = ({
  messages,
  user,
  isLoading,
  typingUsers,
}: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showLoading, setShowLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  // show loading indicator for 1 second after the messages are loaded, avoid flickering of the loading indicator
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setShowLoading(true);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setShowLoading(false);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="loading-container">
        {showLoading && (
          <>
            <FontAwesomeIcon icon={faSpinner} spin aria-hidden="true" />
            <span>Loading messages...</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="message-list" data-testid="message-list">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          isSentByCurrentUser={message.user.id === user.id}
        />
      ))}

      <TypingIndicator typingUsers={typingUsers} currentUserId={user.id} />
      <div ref={messagesEndRef} aria-hidden="true" />
    </div>
  );
};

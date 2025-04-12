import { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Message } from './Message';
import './MessageList.scss';
import { TypingIndicator } from './TypingIndicator';

type MessageListProps = {
  messages: {
    id: string;
    user: { id: string; name: string };
    text: string;
    timestamp: Date;
  }[];
  currentUserId: string;
  isLoading: boolean;
  typingUsers: { id: string; name: string }[];
};

export const MessageList = ({
  messages,
  currentUserId,
  isLoading,
  typingUsers,
}: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} spin />
        <span>Loading messages...</span>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          isSentByCurrentUser={message.user.id === currentUserId}
        />
      ))}

      <TypingIndicator
        typingUsers={typingUsers}
        currentUserId={currentUserId}
      />
      <div ref={messagesEndRef} />
    </div>
  );
};

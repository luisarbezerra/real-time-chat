import { useRef, useEffect } from 'react';
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} spin aria-hidden="true" />
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
          isSentByCurrentUser={message.user.id === user.id}
        />
      ))}

      <TypingIndicator typingUsers={typingUsers} currentUserId={user.id} />
      <div ref={messagesEndRef} aria-hidden="true" />
    </div>
  );
};

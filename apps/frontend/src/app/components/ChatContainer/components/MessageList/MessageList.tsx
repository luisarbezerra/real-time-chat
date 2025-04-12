import { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Message } from './Message';
import './MessageList.scss';

type MessageListProps = {
  messages: { id: string; user: string; text: string; timestamp: Date }[];
  currentUsername: string;
  isLoading: boolean;
};

export const MessageList = ({
  messages,
  currentUsername,
  isLoading,
}: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} currentUsername={currentUsername} />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

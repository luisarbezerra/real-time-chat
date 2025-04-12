import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faUser,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import './ChatBox.scss';

const socket = io('http://localhost:3333');

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

export const ChatBox = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    { user: string; text: string; timestamp: Date }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on('chat_history', (msgs) => {
      const messagesWithTimestamp = msgs.map((msg: any) => ({
        ...msg,
        timestamp: new Date(),
      }));
      setMessages(messagesWithTimestamp);
      setIsLoading(false);
    });

    socket.on('new_message', (msg) => {
      const msgWithTimestamp = {
        ...msg,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, msgWithTimestamp]);
    });

    return () => {
      socket.off('chat_history');
      socket.off('new_message');
    };
  }, []);

  const handleUsernameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setUsername(username.trim());
    } else if (e.key === 'Escape') {
      setUsername(username.trim());
    }
  };

  const sendMessage = () => {
    if (username && message.trim()) {
      socket.emit('new_message', { user: username, text: message.trim() });
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="username-container">
          <div className="username-icon">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="username-input">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleUsernameKeyPress}
              maxLength={30}
              placeholder="Enter your username"
            />
          </div>
        </div>
      </div>

      <div className="messages-container">
        {isLoading ? (
          <div className="loading-container">
            <FontAwesomeIcon icon={faSpinner} spin />
            <span>Loading messages...</span>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${
                msg.user === username ? 'sent' : 'received'
              }`}
            >
              <div className="message-content">{msg.text}</div>
              <div className="message-timestamp">
                {msg.user}, {formatTime(msg.timestamp)}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <div className="message-input">
          <textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            maxLength={300}
          />
        </div>
        <button
          onClick={sendMessage}
          disabled={!username || !message.trim()}
          aria-label="Send message"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

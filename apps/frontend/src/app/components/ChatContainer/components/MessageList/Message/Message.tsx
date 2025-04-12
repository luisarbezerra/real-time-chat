import { formatTime } from './utils/formatTime';

interface MessageProps {
  message: {
    user: string;
    text: string;
    timestamp: Date;
  };
  currentUsername: string;
}

export const Message = ({ message, currentUsername }: MessageProps) => {
  const isSentByCurrentUser = message.user === currentUsername;

  return (
    <div className={`message ${isSentByCurrentUser ? 'sent' : 'received'}`}>
      <div className="message-content">{message.text}</div>
      <div className="message-timestamp">
        {message.user}, {formatTime(message.timestamp)}
      </div>
    </div>
  );
};

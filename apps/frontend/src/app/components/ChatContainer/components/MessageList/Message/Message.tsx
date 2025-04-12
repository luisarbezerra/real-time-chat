import { formatTime } from './utils/formatTime';

interface MessageProps {
  message: {
    user: { id: string; name: string };
    text: string;
    timestamp: Date;
  };
  isSentByCurrentUser: boolean;
}

export const Message = ({ message, isSentByCurrentUser }: MessageProps) => {
  return (
    <div className={`message ${isSentByCurrentUser ? 'sent' : 'received'}`}>
      <div className="message-content">{message.text}</div>
      <div className="message-timestamp">
        {message.user.name}, {formatTime(message.timestamp)}
      </div>
    </div>
  );
};

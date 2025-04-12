import { formatTime } from './utils/formatTime';
import { Message as MessageType } from '@real-time-chat/shared';

interface MessageProps {
  message: MessageType;
  isSentByCurrentUser: boolean;
}
export const Message = ({ message, isSentByCurrentUser }: MessageProps) => {
  return (
    <div className={`message ${isSentByCurrentUser ? 'sent' : 'received'}`}>
      <div className="message-content">{message.text}</div>
      <div className="message-timestamp">
        {message.user.name}, {formatTime(new Date(message.timestamp))}
      </div>
    </div>
  );
};

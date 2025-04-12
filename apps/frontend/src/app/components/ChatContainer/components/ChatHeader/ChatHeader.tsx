import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './ChatHeader.scss';

interface ChatHeaderProps {
  username: string;
  onUsernameChange: (username: string) => void;
}

export const ChatHeader = ({ username, onUsernameChange }: ChatHeaderProps) => {
  const handleUsernameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      onUsernameChange(username.trim());
    }
  };

  return (
    <div className="chat-header">
      <div className="username-container">
        <div className="username-icon">
          <FontAwesomeIcon icon={faUser} />
        </div>

        <div className="username-input">
          <input
            type="text"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            onKeyDown={handleUsernameKeyPress}
            maxLength={30}
            placeholder="Enter your username"
          />
        </div>
      </div>
    </div>
  );
};

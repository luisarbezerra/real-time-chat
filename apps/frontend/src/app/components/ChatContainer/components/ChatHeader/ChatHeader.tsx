import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import DOMPurify from 'dompurify';
import './ChatHeader.scss';

interface ChatHeaderProps {
  username: string;
  onUsernameChange: (username: string) => void;
}

export const ChatHeader = ({ username, onUsernameChange }: ChatHeaderProps) => {
  const handleUsernameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      onUsernameChange(DOMPurify.sanitize(username.trim()));
    }
  };

  const handleUsernameChange = (value: string) => {
    const sanitizedValue = DOMPurify.sanitize(value);
    onUsernameChange(sanitizedValue);
  };

  return (
    <div className="chat-header">
      <div className="username-container">
        <div className="username-icon">
          <FontAwesomeIcon icon={faUser} aria-hidden="true" />
        </div>

        <div className="username-input">
          <input
            type="text"
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
            onKeyDown={handleUsernameKeyPress}
            maxLength={30}
            placeholder="Enter your username"
            aria-label="Username input"
            aria-required="true"
          />
        </div>
      </div>
    </div>
  );
};

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DOMPurify from 'dompurify';
import React, { useState, useEffect, useRef } from 'react';

import './ChatHeader.scss';
import { ConnectionIndicator } from './ConnectionIndicator';

type ChatHeaderProps = {
  username: string;
  onUsernameChange: (username: string) => void;
  isConnected: boolean;
  isInputDisabled: boolean;
};

const MAX_USERNAME_LENGTH = 25;

export const ChatHeader = ({
  username,
  onUsernameChange,
  isConnected,
  isInputDisabled,
}: ChatHeaderProps): React.ReactElement => {
  const [showCharLimitWarning, setShowCharLimitWarning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setShowCharLimitWarning(username.length === MAX_USERNAME_LENGTH);
  }, [username]);

  useEffect(() => {
    // Focus on the input when the component mounts
    if (inputRef.current && !isInputDisabled) {
      inputRef.current.focus();
    }
  }, [isInputDisabled]);

  const handleUsernameKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      onUsernameChange(DOMPurify.sanitize(username.trim()));
    }
  };

  const handleUsernameChange = (value: string): void => {
    const sanitizedValue = DOMPurify.sanitize(value);
    onUsernameChange(sanitizedValue);
  };

  return (
    <div className="chat-header" data-testid="chat-header">
      <div className="username-container">
        <div className="username-icon">
          <FontAwesomeIcon icon={faUser} aria-hidden="true" />
        </div>

        <div className="username-input">
          <input
            type="text"
            autoFocus
            ref={inputRef}
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
            onKeyDown={handleUsernameKeyPress}
            maxLength={MAX_USERNAME_LENGTH}
            placeholder="Enter your username"
            aria-label="Username input"
            aria-required="true"
            disabled={isInputDisabled}
            data-testid="username-input"
          />

          {showCharLimitWarning && (
            <div
              className="character-limit-warning"
              aria-label="Character limit warning: 25 characters max"
              aria-hidden={!showCharLimitWarning}
            >
              {username.length}/{MAX_USERNAME_LENGTH}
            </div>
          )}
        </div>

        {!isInputDisabled && <ConnectionIndicator isConnected={isConnected} />}
      </div>
    </div>
  );
};

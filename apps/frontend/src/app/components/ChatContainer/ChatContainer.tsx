import { useState } from 'react';
import React from 'react';

import { useSocket } from '../../hooks/useSocket';
import { useUser } from '../../hooks/useUser';

import { ChatHeader } from './components/ChatHeader';
import { ChatInput } from './components/ChatInput';
import { MessageList } from './components/MessageList';
import './ChatContainer.scss';

export const ChatContainer = (): React.ReactElement => {
  const { user, updateUsername } = useUser();
  const [message, setMessage] = useState('');

  const {
    messages,
    isLoading,
    typingUsers,
    handleTyping,
    sendMessage,
    isConnected,
  } = useSocket(user);

  const handleSendMessage = (): void => {
    if (sendMessage(message)) {
      setMessage('');
    }
  };

  return (
    <div className="chat-container" data-testid="chat-container">
      <ChatHeader
        username={user.name}
        onUsernameChange={updateUsername}
        isConnected={isConnected}
        isInputDisabled={isLoading}
      />

      <MessageList
        messages={messages}
        user={user}
        isLoading={isLoading}
        typingUsers={typingUsers}
      />

      <ChatInput
        message={message}
        onMessageChange={(value) => {
          setMessage(value);
          handleTyping();
        }}
        onSendMessage={handleSendMessage}
        isSendDisabled={
          !user.name || !message.trim() || !isConnected || isLoading
        }
        isInputDisabled={isLoading}
      />
    </div>
  );
};

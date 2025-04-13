import { useState } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { useSocket } from '../../hooks/useSocket';
import { useUser } from '../../hooks/useUser';
import './ChatContainer.scss';

export const ChatContainer = () => {
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

  const handleSendMessage = () => {
    if (sendMessage(message)) {
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
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

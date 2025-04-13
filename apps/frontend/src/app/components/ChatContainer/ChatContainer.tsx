import { useState } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { useSocket } from '../../hooks/useSocket';
import { User } from '@real-time-chat/shared';
import './ChatContainer.scss';

export const ChatContainer = () => {
  const [user, setUser] = useState<User>({
    id: crypto.randomUUID(),
    name: '',
  });
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

  const handleUsernameChange = (name: string) => {
    setUser((prev) => ({ ...prev, name }));
  };

  return (
    <div className="chat-container">
      <ChatHeader
        username={user.name}
        onUsernameChange={handleUsernameChange}
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

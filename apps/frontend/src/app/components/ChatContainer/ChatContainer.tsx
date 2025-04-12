import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { ChatHeader } from './components/ChatHeader';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import './ChatContainer.scss';

const socket = io('http://localhost:3333');

export const ChatContainer = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    { id: string; user: string; text: string; timestamp: Date }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const sendMessage = () => {
    if (username && message.trim()) {
      socket.emit('new_message', { user: username, text: message.trim() });
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <ChatHeader username={username} onUsernameChange={setUsername} />

      <MessageList
        messages={messages}
        currentUsername={username}
        isLoading={isLoading}
      />

      <ChatInput
        message={message}
        onMessageChange={setMessage}
        onSendMessage={sendMessage}
        isSendDisabled={!username || !message.trim()}
      />
    </div>
  );
};

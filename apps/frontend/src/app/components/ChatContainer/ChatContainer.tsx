import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { ChatHeader } from './components/ChatHeader';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import './ChatContainer.scss';
import { Message, User } from '@real-time-chat/shared';

const socket = io('http://localhost:3333');

export const ChatContainer = () => {
  const [userId] = useState(() => uuidv4());
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typingUsers, setTypingUsers] = useState<User[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

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

    socket.on('user_typing', (users) => {
      setTypingUsers(users);
    });

    return () => {
      socket.off('chat_history');
      socket.off('new_message');
      socket.off('user_typing');
    };
  }, []);

  const handleTyping = () => {
    if (username) {
      socket.emit('typing', { id: userId, name: username });
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      const timeout = setTimeout(() => {
        socket.emit('stop_typing', { id: userId, name: username });
      }, 1000);
      setTypingTimeout(timeout);
    }
  };

  const sendMessage = () => {
    if (username && message.trim()) {
      socket.emit('new_message', {
        user: { id: userId, name: username },
        text: message.trim(),
      });
      socket.emit('stop_typing', { id: userId, name: username });
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <ChatHeader username={username} onUsernameChange={setUsername} />

      <MessageList
        messages={messages}
        currentUserId={userId}
        isLoading={isLoading}
        typingUsers={typingUsers}
      />

      <ChatInput
        message={message}
        onMessageChange={(value) => {
          setMessage(value);
          handleTyping();
        }}
        onSendMessage={sendMessage}
        isSendDisabled={!username || !message.trim()}
      />
    </div>
  );
};

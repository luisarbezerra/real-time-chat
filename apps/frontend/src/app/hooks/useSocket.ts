import { Message, User } from '@real-time-chat/shared';
import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3333');

type UseSocketProps = {
  user: User;
};

type UseSocketReturn = {
  messages: Message[];
  isLoading: boolean;
  typingUsers: User[];
  handleTyping: () => void;
  sendMessage: (message: string) => boolean;
  isConnected: boolean;
};

export const useSocket = ({ user }: UseSocketProps): UseSocketReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typingUsers, setTypingUsers] = useState<User[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('chat_history', (msgs: Message[]) => {
      setMessages(msgs);
      setIsLoading(false);
    });

    socket.on('new_message', (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('user_typing', (users: User[]) => {
      setTypingUsers(users);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat_history');
      socket.off('new_message');
      socket.off('user_typing');
    };
  }, []);

  const handleTyping = useCallback(() => {
    if (user.name) {
      socket.emit('typing', user);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      const timeout = setTimeout(() => {
        socket.emit('stop_typing', user);
      }, 1000);

      setTypingTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(user), typingTimeout]);

  const sendMessage = useCallback(
    (message: string) => {
      if (user.name && message.trim() && isConnected) {
        socket.emit('new_message', {
          user: user,
          text: message.trim(),
        });

        socket.emit('stop_typing', user);
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
        return true;
      }
      return false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(user), typingTimeout]
  );

  return {
    messages,
    isLoading,
    typingUsers,
    handleTyping,
    sendMessage,
    isConnected,
  };
};

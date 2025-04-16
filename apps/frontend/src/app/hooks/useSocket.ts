import { Message, User } from '@real-time-chat/shared';
import { useEffect, useState, useCallback, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

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
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection only once, avoid error when multiple instances are created
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:3333', {
        reconnectionAttempts: 5,
        timeout: 10000,
      });
    }

    const socket = socketRef.current;

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
      // Don't disconnect socket on component unmount, just remove listeners
      // socket.disconnect();
    };
  }, []);

  const handleTyping = useCallback(() => {
    if (user.name && socketRef.current) {
      socketRef.current.emit('typing', user);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      const timeout = setTimeout(() => {
        socketRef.current?.emit('stop_typing', user);
      }, 1000);

      setTypingTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(user), typingTimeout]);

  const sendMessage = useCallback(
    (message: string) => {
      if (user.name && message.trim() && isConnected && socketRef.current) {
        socketRef.current.emit('new_message', {
          user: user,
          text: message.trim(),
        });

        socketRef.current.emit('stop_typing', user);
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
        return true;
      }
      return false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(user), typingTimeout, isConnected]
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

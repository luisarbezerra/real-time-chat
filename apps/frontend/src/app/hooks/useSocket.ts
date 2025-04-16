import { 
  Message, 
  User, 
  SocketEvents, 
} from '@real-time-chat/shared';
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

const SOCKET_CONFIG = {
  SERVER_URL: 'http://localhost:3333',
  RECONNECTION_ATTEMPTS: 5,
  TIMEOUT: 10000,
  TYPING_DEBOUNCE_MS: 3000,
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
      socketRef.current = io(SOCKET_CONFIG.SERVER_URL, {
        reconnectionAttempts: SOCKET_CONFIG.RECONNECTION_ATTEMPTS,
        timeout: SOCKET_CONFIG.TIMEOUT,
      });
    }

    const socket = socketRef.current;

    socket.on(SocketEvents.CONNECT, () => setIsConnected(true));
    socket.on(SocketEvents.DISCONNECT, () => setIsConnected(false));

    socket.on(SocketEvents.CHAT_HISTORY, (msgs: Message[]) => {
      setMessages(msgs);
      setIsLoading(false);
    });

    socket.on(SocketEvents.NEW_MESSAGE, (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on(SocketEvents.USER_TYPING, (users: User[]) => {
      setTypingUsers(users);
    });

    return () => {
      socket.off(SocketEvents.CONNECT);
      socket.off(SocketEvents.DISCONNECT);
      socket.off(SocketEvents.CHAT_HISTORY);
      socket.off(SocketEvents.NEW_MESSAGE);
      socket.off(SocketEvents.USER_TYPING);
      // Don't disconnect socket on component unmount, just remove listeners
      // socket.disconnect();
    };
  }, []);

  const handleTyping = useCallback(() => {
    if (user.name && socketRef.current) {
      socketRef.current.emit(SocketEvents.TYPING, user);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      //debounced typing events to prevent event flooding
      const timeout = setTimeout(() => {
        socketRef.current?.emit(SocketEvents.STOP_TYPING, user);
      }, SOCKET_CONFIG.TYPING_DEBOUNCE_MS);

      setTypingTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(user), typingTimeout]);

  const sendMessage = useCallback(
    (message: string) => {
      if (user.name && message.trim() && isConnected && socketRef.current) {
        socketRef.current.emit(SocketEvents.NEW_MESSAGE, {
          user: user,
          text: message.trim(),
        });

        socketRef.current.emit(SocketEvents.STOP_TYPING, user);
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

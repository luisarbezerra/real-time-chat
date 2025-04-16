export type User = {
  id: string;
  name: string;
};

export type Message = {
  id: string;
  user: User;
  text: string;
  timestamp: Date;
};

export enum SocketEvents {
  CONNECTION = 'connection',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  ERROR = 'error',
  NEW_MESSAGE = 'new_message',
  CHAT_HISTORY = 'chat_history',
  TYPING = 'typing',
  STOP_TYPING = 'stop_typing',
  USER_TYPING = 'user_typing',
}

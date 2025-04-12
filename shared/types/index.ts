export interface User {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  user: User;
  text: string;
  timestamp: Date;
}

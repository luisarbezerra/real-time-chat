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

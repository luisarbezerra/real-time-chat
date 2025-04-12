import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { Message, User } from '@real-time-chat/shared';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

const messages: Message[] = [];
const typingUsers = new Map<User['id'], User>();

io.on('connection', (socket) => {
  console.log('user connected');

  socket.emit('chat_history', messages);

  socket.on('new_message', (msg: Omit<Message, 'id' | 'timestamp'>) => {
    console.log('new message', msg);
    const newMessage: Message = {
      id: uuidv4(),
      ...msg,
      timestamp: new Date(),
    };
    messages.push(newMessage);
    io.emit('new_message', newMessage);
  });

  socket.on('typing', (user: User) => {
    if (user?.id && user?.name) {
      typingUsers.set(user.id, user);
      socket.broadcast.emit('user_typing', Array.from(typingUsers.values()));
    }
  });

  socket.on('stop_typing', (user: User) => {
    if (user?.id) {
      typingUsers.delete(user.id);
      socket.broadcast.emit('user_typing', Array.from(typingUsers.values()));
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = 3333;
server.listen(PORT, () => console.log(`API listening on port ${PORT}`));

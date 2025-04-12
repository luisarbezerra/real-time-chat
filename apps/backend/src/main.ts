import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

const messages: {
  id: string;
  user: { id: string; name: string };
  text: string;
}[] = [];
const typingUsers = new Map<string, { id: string; name: string }>();

io.on('connection', (socket) => {
  console.log('user connected');

  socket.emit('chat_history', messages);

  socket.on('new_message', (msg) => {
    console.log('new message', msg);
    messages.push({ id: uuidv4(), ...msg });
    io.emit('new_message', msg);
  });

  socket.on('typing', (user) => {
    if (user?.id && user?.name) {
      typingUsers.set(user.id, user);
      socket.broadcast.emit('user_typing', Array.from(typingUsers.values()));
    }
  });

  socket.on('stop_typing', (user) => {
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

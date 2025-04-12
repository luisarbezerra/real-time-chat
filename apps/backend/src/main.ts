import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

const messages: { user: string; text: string }[] = [];

io.on('connection', (socket) => {
  console.log('user connected');

  socket.emit('chat_history', messages);

  socket.on('new_message', (msg) => {
    console.log('new message', msg);
    messages.push(msg);
    io.emit('new_message', msg);
  });
});

const PORT = 3333;
server.listen(PORT, () => console.log(`API listening on port ${PORT}`));

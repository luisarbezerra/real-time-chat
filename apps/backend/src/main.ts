import { createExpressApp, PORT } from './config/server.config';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';
import { SocketEvents } from './socket/socket.events';

const { server, io } = createExpressApp();
const messageService = new MessageService();
const userService = new UserService();
const socketEvents = new SocketEvents(io, messageService, userService);

// Connection event and setup socket events
io.on('connection', (socket) => {
  socketEvents.setupSocketEvents(socket);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

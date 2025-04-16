import { createExpressApp, PORT } from './config/server.config';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';
import { SocketEventsHandler } from './socket/socket.events';
import { SocketEvents } from '@real-time-chat/shared';

const { server, io } = createExpressApp();
const messageService = new MessageService();
const userService = new UserService();
const socketEvents = new SocketEventsHandler(io, messageService, userService);

// Connection event and setup socket events
io.on(SocketEvents.CONNECTION, (socket) => {
  socketEvents.setupSocketEvents(socket);
});

server.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);

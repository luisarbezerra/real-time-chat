import express, { Express } from 'express';
import { createServer, Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';

export const createExpressApp = (): {
  app: Express;
  server: HttpServer;
  io: SocketServer;
} => {
  const app = express();
  const server = createServer(app);
  const io = new SocketServer(server, {
    cors: { origin: '*' },
  });

  return { app, server, io };
};

export const PORT = 3333;

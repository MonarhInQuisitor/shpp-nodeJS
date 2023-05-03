"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const port = 3000;
const host = "localhost";
const server = net_1.default.createServer(socket => {
    console.log('Client connected');
    socket.on('data', (data) => {
        console.log(`Received data: ${data.toString()}`);
        socket.write(data);
        console.log(`request's text - ${data.toString()} 
      ip - ${socket.remoteAddress}:${socket.remotePort}
      time of request -  ${new Date()}`);
    });
    socket.on('end', () => {
        console.log(`${new Date().getHours()}:${new Date().getMinutes()} Client disconnected`);
    });
});
server.listen(port, host, () => {
    console.log(`Server listening on ${host}:${port}`);
});
server.on('error', (err) => {
    throw err;
});

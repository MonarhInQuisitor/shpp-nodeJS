"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dgram_1 = __importDefault(require("dgram"));
const port = 3000;
const host = "localhost";
const server = dgram_1.default.createSocket('udp4');
server.on('message', (message, remote) => {
    console.log(`request's text - ${message.toString()} 
        ip - ${remote.port} : ${remote.address}
        time of request -  ${new Date()}`);
    server.send(message, remote.port, remote.address);
});
server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening on ${address.address}:${address.port}`);
});
server.on('listening', () => console.log('Server listening...'));
server.bind(port, host);

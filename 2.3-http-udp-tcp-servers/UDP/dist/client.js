"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dgram_1 = __importDefault(require("dgram"));
const port = 3000;
const host = "localhost";
const text = 'Hello';
const now = performance.now();
const massage = "UDP server starting...";
const client = dgram_1.default.createSocket('udp4');
client.send(massage, 3000, 'localhost', (err) => {
    if (err) {
        client.close();
        throw err;
    }
});
client.on('message', message => {
    console.log("request is posted...");
    console.log(message.toString());
    console.log(performance.now() - now);
    client.close();
});

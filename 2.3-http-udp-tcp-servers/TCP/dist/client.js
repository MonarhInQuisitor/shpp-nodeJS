"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const port = 3000;
const host = "localhost";
const text = 'Hello';
const now = performance.now();
const client = new net_1.default.Socket();
client.connect(port, host, () => {
    console.log('Connected to server');
    client.write(text);
});
client.on('data', (data) => {
    console.log("request is posted...");
    console.log(data.toString());
    console.log(performance.now() - now);
});
client.on('close', () => {
    console.log('Connection closed');
});
client.on("error", (error) => {
    console.error(`Problem with request: ${error}`);
});

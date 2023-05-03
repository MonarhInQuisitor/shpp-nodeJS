"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const port = 3000;
const host = "localhost";
const text = 'Hello';
const now = performance.now();
const options = {
    hostname: host,
    port: port,
    path: "/",
    method: "post",
    headers: {
        "Content-Type": "text/plain",
        "Content-Length": text.length,
    },
};
const client = http_1.default.request(options, res => {
    res.on('data', (chunk) => {
        console.log("request is posted...");
        console.log(chunk.toString());
        console.log(performance.now() - now);
    });
});
client.on("error", error => {
    console.error(`Problem with request: ${error}`);
});
client.write(text);
client.end();

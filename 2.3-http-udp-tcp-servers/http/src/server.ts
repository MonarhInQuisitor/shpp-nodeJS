import http from 'http';

const port = 3000;
const host = "localhost"

const server = http.createServer().listen(port, host, () => console.log('Server listening...'));
server.on('request', (req, res) => {
    console.log('Server get request');
    let finishText = ""
    req.on('data', (text) => {
        finishText += text
       
    })
    req.on("end", () => {
        console.log(`request's text - ${finishText.toString()} 
        ip - ${req.socket.remoteAddress} : ${req.socket.remotePort}
        time of request -  ${new Date()}`);
        res.writeHead(200);
        res.end(finishText);
    })
});

server.on('listening', () => console.log('Server listening...'));
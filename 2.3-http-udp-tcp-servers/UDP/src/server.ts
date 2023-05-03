import dgram from 'dgram';

const port = 3000;
const host = "localhost"
const server = dgram.createSocket('udp4');


server.on('message', (message, remote) => {
    console.log(`request's text - ${message.toString()} 
        ip - ${remote.port} : ${remote.address}
        time of request -  ${new Date()}`);
        server.send(message, remote.port, remote.address)
  });
  
server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening on ${address.address}:${address.port}`);
  });

server.on('listening', () => console.log('Server listening...'));
server.bind(port, host);
import dgram from 'dgram';

const port = 3000;
const host = "localhost"
const text = 'Hello'

const now = performance.now();

  const client = dgram.createSocket('udp4');
  client.send(text, port, host, (err) => {
    if (err) {
        client.close()
        throw err
      }
  });
  
  client.on('message', message => {
    console.log("request is posted...");
    console.log(message.toString());
    console.log(performance.now() - now);
    client.close();
  })

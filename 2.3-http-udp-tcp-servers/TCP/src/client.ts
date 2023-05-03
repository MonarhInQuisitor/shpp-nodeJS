import tcp from 'net';

const port = 3000;
const host = "localhost"
const text = 'Hello'

const now = performance.now();


const client = new tcp.Socket()


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
client.on("error", (error: string) => {
    console.error(`Problem with request: ${error}`)
})


import http from 'http';

const port = 3000;
const host = "localhost"
const text = 'Hello'

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
  }

  const client = http.request(options, res => {
    res.on('data', (chunk) => {
        console.log("request is posted...");
        console.log(chunk.toString());
        console.log(performance.now() - now);
      });
  })
client.on("error", error => {
    console.error(`Problem with request: ${error}`)
  })
  client.write(text);
client.end();
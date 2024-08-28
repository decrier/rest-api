// HTTP-Server mit Bordmitteln von Node.js
import { createServer } from "http";
const port = 3001;
const server = createServer();

server.on("request", (request, response) => {
    console.log(`URL: ${request.url}`);
    response.end("Hello, server!");
});

// start the server
server.listen(port, (error) => {
    if (error) return console.log(`ERROR: ${error}`);
    console.log(`Server listening on port ${port}`);
});
const port = process.env.port || 8080;
const http = require("http");
const app = require("./app");
const server = http.createServer(app);

server.listen(port, () => console.log(`Server started on port ${port}.`));
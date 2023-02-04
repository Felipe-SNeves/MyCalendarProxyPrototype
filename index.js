#!/usr/bin/env node

require ('dotenv').config ();
const http = require ('http');
const app = require ('./app');
const port = process.env.PORT;

app.set ('port', port);

const server = http.createServer (app);

server.listen (port, process.env.SERVER_IP, () => {
    console.log ("Server started up!");
});
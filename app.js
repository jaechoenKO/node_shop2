const express = require('express');
const app = express();

const http = require('http');

app.use((req, res) => {
    res.status(200).json({
        message: 'It works!'
    });
});

const PORT = 3000;

// express server 할당.
const server = http.createServer(app);

server.listen(PORT, () => console.log('Server Started...'));
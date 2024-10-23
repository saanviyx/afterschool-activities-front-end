const http = require('http');
const _ = require('lodash');

// Sample JSON data
const jsonData = [
    { id: 1, topic: 'Math', location: 'Deira', price: 100 },
    { id: 2, topic: 'Physics', location: 'Al Khail',price: 200 },
    { id: 3, topic: 'English', location: 'Ajman' ,price: 300}
];



// Create HTTP server
const server = http.createServer((req, res) => {
    if (req.url === '/data' && req.method === 'GET') {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(jsonData));
        console.log(jsonData);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

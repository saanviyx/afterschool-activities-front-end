import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonData = [
    { id: 1, title: "Math", location: "Hendon", price: 2000, spaces: 25 },
    { id: 2, title: "Physics", location: "Mauritius", price: 2500, spaces: 25 },
    { id: 3, title: "Math", location: "Dubai", price: 2200, spaces: 25 },
    { id: 4, title: "Art", location: "Mauritius", price: 1900, spaces: 25 },
    { id: 5, title: "Chemistry", location: "Hendon", price: 2300, spaces: 25 },
    { id: 6, title: "Psychology", location: "Dubai", price: 2000, spaces: 25 },
    { id: 7, title: "Chemistry", location: "Mauritius", price: 2100, spaces: 25 },
    { id: 8, title: "Art", location: "Hendon", price: 2090, spaces: 25 },
    { id: 9, title: "Math", location: "Mauritius", price: 2100, spaces: 25 },
    { id: 10, title: "Psychology", location: "Hendon", price: 2000, spaces: 25 }
];

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/data', (req, res) => {
    res.json(jsonData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on http://127.0.0.1:${PORT}`);
});

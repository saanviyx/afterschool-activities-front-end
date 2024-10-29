import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../client')));

app.use('/images', express.static(path.join(__dirname, '../client/images')));

const jsonData = [
    { id: 1, title: "Coding", location: "Hendon", price: 2000, spaces: 5, rating: 4.5, image: "/images/coding.jpg" },
    { id: 2, title: "KungFu", location: "Mauritius", price: 2500, spaces: 5, rating: 4, image: "/images/kungfu.jpg" },
    { id: 3, title: "Karate", location: "Dubai", price: 2200, spaces: 5, rating: 3.5, image: "/images/karate.jpg" },
    { id: 4, title: "Art", location: "Mauritius", price: 1900, spaces: 5, rating: 4.5, image: "/images/art.jpg" },
    { id: 5, title: "Robotics", location: "Hendon", price: 2300, spaces: 5, rating: 5, image: "/images/robotics.jpg" },
    { id: 6, title: "Tennis", location: "Dubai", price: 2000, spaces: 5, rating: 3, image: "/images/tennis.jpg"},
    { id: 7, title: "Guitar", location: "Dubai", price: 2100, spaces: 5, rating: 4, image: "/images/guitar.jpg" },
    { id: 8, title: "Piano", location: "Hendon", price: 2090, spaces: 5, rating: 3.5, image: "/images/piano.jpg" },
    { id: 9, title: "Drama", location: "Mauritius", price: 2100, spaces: 5, rating: 5, image: "/images/drama.jpg"},
    { id: 10, title: "Photography", location: "Hendon", price: 2000, spaces: 5, rating: 4, image: "/images/photography.jpg" }
];

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
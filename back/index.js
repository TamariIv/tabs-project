const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
}));


const db = [
    { id: 1, color: "orange", text: "Lorem ipsum dolor sit amet" },
    { id: 2, color: "purple", text: "Ut enim ad minim veniam" },
    { id: 3, color: "green", text: "Sed do eiusmod tempor incididunt" },
    { id: 4, color: "blue", text: "Ut labore et dolore magna aliqua" }
];
// Define a basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/tabs', (req, res) => {
    res.json(db);
});

app.get('/tabs/:id', (req, res) => {
    const id = req.params.id;
    const tab = db.find(tab => tab.id === parseInt(id));
    if (!tab) {
        return res.status(404).send('Tab not found');
    }
    res.json(tab);
});

app.post('/tabs', (req, res) => {
    const tab = {
        id: db.length + 1,
        color: req.body.color,
        text: req.body.text
    };
    db.push(tab);
    res.json(tab);
});


app.patch('/tabs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tabIndex = db.findIndex((tab) => tab.id === id);

    if (tabIndex !== -1) {
        db[tabIndex] = { ...db[tabIndex], ...req.body };
        res.json(db[tabIndex]);
    } else {
        res.status(404).json({ message: 'Tab not found' });
    }
});

app.delete('/tabs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tabIndex = db.findIndex((tab) => tab.id === id);

    if (tabIndex !== -1) {
        const deletedTab = db.splice(tabIndex, 1);
        res.json(deletedTab);
    } else {
        res.status(404).json({ message: 'Tab not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

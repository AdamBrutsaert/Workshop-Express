import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const users: { id: number, name: string }[] = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" }
];

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
})

app.get("/user/:id", (req, res) => {
    res.json({ id: req.params.id });
});

app.post("/user", (req, res) => {
    res.json(req.body);
})

app.put("/user/:id", (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (!req.body.name) {
        return res.status(400).json({ message: "Name is required" });
    }

    user.name = req.body.name;
    return res.json(user);
});

app.listen(port, () => {
    console.log(`Server is up and running on http://localhost:${port}`)
});

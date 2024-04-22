import { Router} from 'express';

const users: { id: number, name: string }[] = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" }
];

const router = Router();

router.get("/user/:id", (req, res) => {
    res.json({ id: req.params.id });
});

router.post("/user", (req, res) => {
    res.json(req.body);
})

router.put("/user/:id", (req, res) => {
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

export default router;

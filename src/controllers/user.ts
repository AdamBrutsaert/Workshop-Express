import { Request, Response } from 'express';

export type User = {
    id: number;
    name: string;
    description: string;
    age: number;
};

const users: User[] = [
    { id: 1, name: "John Doe", description: "Im a good boi", age: 69 },
    { id: 2, name: "Jane Doe", description: "HANN", age: 42 },
    { id: 3, name: "Bob", description: "I'm a teapot", age: 418 },
];

let id = 4;

export function getUser(req: Request, res: Response) {
    if (!req.params.id)
        return res.status(400).json({ message: "ID is required" });

    const id = parseInt(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ message: "ID must be a number" });

    const user = users.find(user => user.id === id);
    if (!user)
        return res.status(404).json({ message: "User not found" });

    return res.json(user);
}

export function createUser(req: Request, res: Response) {
    if (!req.body.name)
        return res.status(400).json({ message: "Name is required" });
    if (!req.body.description)
        return res.status(400).json({ message: "Description is required" });
    if (!req.body.age)
        return res.status(400).json({ message: "Age is required" });

    const age = parseInt(req.body.age);
    if (isNaN(age))
        return res.status(400).json({ message: "Age must be a number" });

    const user: User = {
        id: id++,
        name: req.body.name,
        description: req.body.description,
        age: req.body.age,
    };

    users.push(user);
    return res.json(user);
}

export function updateUser(req: Request, res: Response) {
    if (!req.params.id)
        return res.status(400).json({ message: "ID is required" });

    const id = parseInt(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ message: "ID must be a number" });

    const user = users.find(user => user.id === id);
    if (!user)
        return res.status(404).json({ message: "User not found" });

    const name = req.body.name;
    const description = req.body.description;
    const age = req.body.age;

    if (age !== undefined && isNaN(parseInt(age)))
        return res.status(400).json({ message: "Age must be a number" });

    if (name !== undefined) user.name = name;
    if (description !== undefined) user.description = description;
    if (age !== undefined) user.age = parseInt(age);

    return res.json(user);
}

export function deleteUser(req: Request, res: Response) {
    if (!req.params.id)
        return res.status(400).json({ message: "ID is required" });

    const id = parseInt(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ message: "ID must be a number" });

    const index = users.findIndex(user => user.id === id);
    if (index === -1)
        return res.status(404).json({ message: "User not found" });

    users.splice(index, 1);
    return res.status(204).send();
}

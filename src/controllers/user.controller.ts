import { Request, Response } from 'express';
import * as userService from "../services/user.service.js";

export async function getUser(req: Request, res: Response) {
    if (!req.params.id) return res.status(400).json({ message: "ID is required" });

    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID must be a number" });

    const user = await userService.getUser(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
}

export async function createUser(req: Request, res: Response) {
    if (!req.body.name) return res.status(400).json({ message: "Name is required" });
    if (!req.body.description) return res.status(400).json({ message: "Description is required" });
    if (!req.body.age) return res.status(400).json({ message: "Age is required" });

    const age = parseInt(req.body.age);
    if (isNaN(age)) return res.status(400).json({ message: "Age must be a number" });

    const user = await userService.createUser({ name: req.body.name, description: req.body.description, age });
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
}

export async function updateUser(req: Request, res: Response) {
    if (!req.params.id) return res.status(400).json({ message: "ID is required" });

    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID must be a number" });

    const age = req.body.age;
    if (age !== undefined && isNaN(parseInt(age))) return res.status(400).json({ message: "Age must be a number" });

    const user = await userService.updateUser(id, {
        name: req.body.name,
        description: req.body.description,
        age: age !== undefined ? parseInt(age) : undefined,
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
    if (!req.params.id) return res.status(400).json({ message: "ID is required" });

    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID must be a number" });

    const result = await userService.deleteUser(id);
    if (!result) return res.status(404).json({ message: "User not found" });
    return res.status(204).send();
}

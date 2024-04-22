import { Router} from 'express';

import { logUserRequest } from '../middlewares/logging.middleware.js';
import { getUser, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = Router();

// Special routes
router.get("/marvin", (req, res) => res.status(403).send());
router.get("/corrupted", (req, res) => { throw new Error(); });

// CRUD Routes
router.post("/", createUser);
router.get("/:id", logUserRequest, getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

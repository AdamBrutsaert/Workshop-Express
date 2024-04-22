import express from 'express';
import dotenv from 'dotenv';

import userRouter from './routes/user.js';
import { handleInternalErrors } from './middlewares/errors.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
    .use("/user", userRouter)
    .use(handleInternalErrors);

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
})

app.listen(port, () => {
    console.log(`Server is up and running on http://localhost:${port}`)
});

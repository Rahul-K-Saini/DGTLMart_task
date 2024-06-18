import express from "express";
import { main, findUserByUsername } from "./db/index.js";
import cors from "cors";
const app = express();



// Middleware to parse JSON request body
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));

// GET route to retrieve all users
app.get('/users', async (req, res) => {
    try {
        const users = await main();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST route to retrieve a movie by username
app.post('/users/:username', async (req, res) => {
    const { username } = req.params;
    console.log("username",username);
    try {
        const user = await findUserByUsername(username);
        console.log("user",user);
        if (!user) {
            return res.status(404).json({ error: `User with username ${username} not found` });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

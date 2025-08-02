import express from "express";
import cors from "cors";
import Todo from "./models/todo.schema.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
const PORT = process.env.PORT || 8000
dotenv.config({});
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/api/todos', async (req, res) => {
    const newTodo = new Todo({ text: req.body.text });
    await newTodo.save();
    res.status(201).json(newTodo);
});

app.put('api/todo/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params, req.body, { new: true });
    res.json(todo);
});

app.delete("/api/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));


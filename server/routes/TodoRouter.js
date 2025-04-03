import express from 'express';
import { getAllTodos, createTodo, updateTodo, deleteTodo, toggleComplete } from '../controllers/Todocontroller.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';

const router = express.Router();

// Apply auth middleware to all todo routes
router.use(authMiddleware);

// Get all todos
router.get('/', getAllTodos);

// Create a new todo
router.post('/', createTodo);

// Update a todo
router.put('/:id', updateTodo);

// Delete a todo
router.delete('/:id', deleteTodo);

// Toggle todo completion status
router.patch('/:id/toggle', toggleComplete);

export default router;
import Todo from '../models/Todo.js';

// Get all todos for a specific user
export const getAllTodos = async (req, res) => {
  try {
    // Check if req.user exists and has an id
    const userId = req.user?.id;
    
    // If there's no userId, get all todos (or you could return an empty array)
    const todos = userId 
      ? await Todo.find({ user: userId }).sort({ createdAt: -1 })
      : await Todo.find().sort({ createdAt: -1 });
      
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { title, description, priority, user } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newTodo = new Todo({
      title,
      description,
      priority: priority || 'medium',
      // Use user from req.body, or req.user.id if available, or undefined
      user: user || req.user?.id
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    const { title, description, priority, completed } = req.body;
    const todoId = req.params.id;

    // Find the todo
    const todo = await Todo.findById(todoId);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    // Only check user ownership if both the todo has a user and req.user exists
    if (todo.user && req.user?.id && todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update the todo
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { 
        title: title || todo.title,
        description: description !== undefined ? description : todo.description,
        priority: priority || todo.priority,
        completed: completed !== undefined ? completed : todo.completed
      },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    
    // Find the todo
    const todo = await Todo.findById(todoId);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    // Only check user ownership if both the todo has a user and req.user exists
    if (todo.user && req.user?.id && todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Todo.findByIdAndDelete(todoId);
    res.json({ message: 'Todo removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Toggle todo completion status
export const toggleComplete = async (req, res) => {
  try {
    const todoId = req.params.id;
    
    // Find the todo
    const todo = await Todo.findById(todoId);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    // Only check user ownership if both the todo has a user and req.user exists
    if (todo.user && req.user?.id && todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    todo.completed = !todo.completed;
    await todo.save();
    
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
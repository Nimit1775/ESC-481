import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import todoRouter from './routes/TodoRouter.js';  // Add this line

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

mongoose.connect(process.env.MONGO_URL, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// routes  
app.use('/api/user', userRouter);
app.use('/api/todos', todoRouter);  // Add this line

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
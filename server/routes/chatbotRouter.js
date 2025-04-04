import { chatbot } from "../controllers/Chatbot.js";
import express from 'express';

const chatRouter = express.Router();  

chatRouter.post('/chat' , chatbot)  ; 

export default chatRouter ; 
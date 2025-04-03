import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();

// register  
export const register = async ( req , res )=>{ 
    const { name  , email , password } = req.body ;  
    if(!name ||  !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }
    
    // check if user already exists
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message: "User already exists"});
    }
    // hash password
    const hashedPass = await bcrypt.hash(password , 10);
    // gen token on register
    
    const token = jwt.sign({name  , email , password} , process.env.JWT_SECRET);
    // save user
    const newUser = new User({name  , email , password: hashedPass});
    await newUser.save();
    return res.status(201).json({message: "User registered successfully" , token});
}

export const login = async ( req  , res  )=>{   

    const { email , password } = req.body ; 
    if(!email || !password){
        return res.status(400).json({message: "All fields are required"});
    }
    // check if user exists
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message: "User does not exist"});
    }
    // check password
    const validPass = await bcrypt.compare(password , user.password);
    if(!validPass){
        return res.status(400).json({message: "Invalid credentials"});
    }
    // gen token on login
    const token = jwt.sign({name: user.name , email: user.email , password: user.password} , process.env.JWT_SECRET);
    return res.status(200).json({message: "User logged in successfully" , token , 
    user: {
        name: user.name , 
        email: user.email , 

    }
    });
    
}
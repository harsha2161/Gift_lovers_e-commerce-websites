import user from "../models/users.js"
import bcript from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
import { response } from "express";
import nodemailer from 'nodemailer';

export function createUser (req, res) {
    
    const password = req.body.password
   
    const hashedpassword = bcript.hashSync(password, 10);

        if(req.body.role == "admin"){
            if(req.user != null){  // " ලොග් වෙලා ඉන්නව නම් අනිවාරෙන් ටෝකෙන් එකෙන් යූසර් ගෙ විස්තර අරන් එකනව, ඒකෙ රෝල් එක ඇඩ්මින් නම් එකවුන් එක හදන්න දෙනව log wenakota witharai tiken ekk hambawenne"
                if(req.user.role != "admin"){

                res.status(403).json({
                    message : "you are not authorized to create admin account. place login first"
                })
                return // "කෝඩ් එක මෙතනින් නතර වෙනව, නැත්තන් රෙස්පොන්ස් එක යවන ඇඩ්මින් එකවුන්ට් එක ගැදෙනව"
                }
            }else{

                res.status(403).json({
                    message : "you are not authorized to create admin account. place login first"
                })
                return
            }
        }

    const User = new user(
        {
        firstName : req.body.firstName,
        lastName  :req.body.lastName,
        email : req.body.email,
        img : req.body.img,
        password : hashedpassword,
        role : req.body.role,
        }

       // req.body
    )
    User.save().then(
        () => {
            console.log(User);
            res.json({
                message : "user create successfully",
                 
            })
        }
    ).catch(
        (error) =>{ 
           res.json({
                message : "user create fales"
           })
        })
}

export async function loginWithGoogle(req,res){
    
    const token = req.body.accessToken
    console.log(token)

    if(!token == null){
        res.status(400).json({
            message : "access token is requered",
        })
        return
    }
    try{
         const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    console.log(response.data)

    const FindUser = await user.findOne({email : response.data.email})
        if(FindUser == null){
            const newUser = new user(
                { 
                    firstName : response.data.given_name,
                    lastName  :response.data.family_name,
                    email : response.data.email,
                    img : response.data.picture,
                    password : "google", 
                }
            )
            await newUser.save()
            const token = jwt.sign(
                {
                    email : newUser.email,
                    firstName : newUser.firstName,
                    lastName : newUser.lastName,
                    img : newUser.ing,
                    role : newUser.role,
                },process.env.JWT_KEY
            )
            res.json(
                {
                message : "login succsessfull",
                token : token,
                role : newUser.role
                }
            )   
        }else{
            const token = jwt.sign(
            {
                email : FindUser.email,
                firstName : FindUser.firstName,
                lastName : FindUser.lastName,
                img : FindUser.img,
                role : FindUser.role
                },process.env.JWT_KEY
            )
            res.json(
            {
                message : "login successfull",
                token : token,
                role : FindUser.role,
            }
        )
    }

}catch(err){
    console.log(err)
}
 
}

export function loginUser(req,res){

    const email = req.body.email
    const password = req.body.password
   
    user.findOne({email : email}).then(
        (user) => { 
          if(user == null){
            res.status(401).json(
                {
                    message : " invalid email address"
                }
            )
          }else{
            // bcript password cheking
            const isPasswordCorrect = bcript.compareSync(password, user.password)
            if(isPasswordCorrect){
              
                const token = jwt.sign(
                    {
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        role : user.role,
                        img : user.img,
                    },
                    process.env.JWT_KEY 
                )
                res.json({

                    message : "logn is sucessfull",
                    token : token,
                    type : user.role
                })

            }else{
                res.status(401).json({
                    message : "invalid password"

                })
            }
        }
   
    })
}

export async function veiwUsers(req,res){
    try{
        const users = await user.find()
        res.json(users)
    }catch(err){
        res.json(
            {
                message : "user show is fails",
                error : err,
            }
        )
    }
    
}

export async function DeleteUSer(req,res){
   
    try{
        await users.deleteOne({email : req.params.email})
        res.json({
            message : "user delete successfull",
        })
    }catch(err){
        res.json({
            message : "users delete failed",
            error : err,
        })
    }
}

export async function BlockUser(req,res){
    const email = req.params.email
    const updatingData = req.body
    try{
        await users.updateOne(
            {email : email},updatingData
        )
        res.json({
            message : "usere blocked successfull"
        })
    }catch{
        res.status(500).json({
            message : "user block failed",
            error : err,
        })
    }
}

export function isAdmin(req){
       if(req.user == null){    
            return false

    }else if (req.user.role != "admin"){
            return false
    }
    else{
            return true
    }
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // 465 වෙනුවට 587 භාවිතා කරන්න
  secure: false, // 587 port එක පාවිච්චි කරන නිසා මේක false වෙන්න ඕනේ
  requireTLS: true, // TLS connection එකක් අනිවාර්ය කරන්න
  auth: {
    user: process.env.EMAIL_USER || "prabhathharsha77@gmail.com", 
    pass: process.env.EMAIL_PASS || "YOUR_NEW_APP_PASSWORD", // Store this in a .env file!
  },
  connectionTimeout: 10000, 
  greetingTimeout: 10000,
  socketTimeout: 10000
});

export async function sentOTP(req, res) {
    const randomOTP = Math.floor(100000 + Math.random() * 900000);    

    // Check if email exists in the request body
   

    const message = {
        from: "prabhathharsha77@gmail.com", // BUG FIX: Added the missing '@'
        to: req.body.email,
        subject: "Resetting password for giftlovers.com",
        text: "This is your password reset OTP : " + randomOTP
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.error("Email sending error:", error);
            return res.status(500).json({
                message: "Failed to send OTP",
                error: error.message
            });
        } else {
            // NOTE: Store `randomOTP` in your database here linked to the user's email.
            // Do NOT send the actual OTP back in this JSON response in a production app.
            return res.status(200).json({
                message: "OTP sent successfully"
                // otp: randomOTP <-- Remove this for actual security
            });
        }
    });
}
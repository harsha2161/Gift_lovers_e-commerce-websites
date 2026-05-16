import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import jwt, { decode } from "jsonwebtoken";
import userRouters from "./routes/userRoutes.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRoute.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); 
var app = express()

//middlewares
app.use(cors()) 
app.use(bodyParser.json())


// jwt Authenticator system
app.use(
  (req,res,next) => {

    const tokenString = req.header("Authorization")
      
    if(tokenString != null){

      const token = tokenString.replace("Bearer ", "")
      jwt.verify(token, process.env.JWT_KEY,{
        algorithms: ['HS256'],
        expiresIn: '15m',
      }, 
        
        (error,decoded) => {        
              if(decoded != null){
                  console.log(decoded);
                  req.user = decoded;
                  next()

              }else{
                console.log("invilid token");
              }
            }
      )
    }else{
        next()  // request transfer to next  
    }
})

const PORT = 5000;

//conntect db and backend server
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database is connected ");

    app.listen(PORT, () => {
      console.log("Server connected with PORT", PORT);
    }); 

  })
  .catch(
    (err) => {
    console.log("Database connection failed ");
    console.log(err); 
  });

  //routers
  app.use("/api/users", userRouters);
  app.use("/api/product", productRouter);
  app.use("/api/order", orderRouter);


  
  

  
  
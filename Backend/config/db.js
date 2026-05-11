import mongoose from "mongoose";


const connectDB = async () =>{
    try{
        await mongoose.connect(db_URL);
        console.log("data base connected is successfull");
    }  catch (err){
        console.error("data base connecttion is fails", err);
        process.exit(1);
    }
}

export default connectDB;
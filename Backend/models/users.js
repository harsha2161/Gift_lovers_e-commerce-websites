import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },

    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "customer"
    },
    img : {
        type : String,
        required : false,
        default : "https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk"
    },
    isBlock : {
        type : Boolean,
        required : true,
        default : false,
    },
   
    
})

const user = mongoose.model("User", UserSchema);

export default user; 
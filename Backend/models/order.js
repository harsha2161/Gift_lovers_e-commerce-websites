import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    orderId : {
        type : String,
        required : true,
        unique : true,
    },// O001 O002

    email : {
        type : String,
        required : true,
    },

    name : {
        type : String,
        required : true,
    },

    phone : {
        type : String,
        required : true,
    },

    address : {
        type : String,
        required : true,
    },

    status : {
        type : String,
        required : true,
        default : "pending",
    },
    
    total : {
        type : Number,
        required : true,
    },


     date : {
        type : Date,
        default : Date.now
    },

    orderProducts : [
        {
            productInfo : {
                productId : {
                    type : String,
                    required : true,
                },
                name : {
                    type : String,
                    required : true,
                },
                altName : [{
                    type : String
                }],
                discription : {
                    type : String,
                    required : true,
                },
                lablePrice : {
                    type : String,
                    required : true,
                },
                price : {
                    type : Number,
                    required : true,
                },
                images : {
                    type : String,
                    required : true,
                },  
        
            },
            quantity : {
                type : Number,
                required : true
            }
        }
    ],
   
})

const order = mongoose.model("order", orderSchema);

export default order
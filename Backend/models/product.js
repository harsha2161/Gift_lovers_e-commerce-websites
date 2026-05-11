import mongoose, { Types } from "mongoose";

const productSchema = mongoose.Schema({
    productId : {
        type : String,
        required : true,
        unique : true,
    },

    productName : {
        type : String,
        required : true,
    },
    altName : [
        {
            type : String
        }
    ],

    description : {
        type : String,
        required : true,
    },

    img : [
        {type : String}
    ],

    lablePrice : {
        type : Number,
        required : true,
    },

    stoke : {
        type : Number,
        required : true,
    },

    isAvailable : {
        type : Boolean,
        required : true,
        default : true,
    },

    review : [
     { 
        reviewInfo : {
            reviewUseraName : {
                type : String,
                required : false,
                default : "reviewd added by anonymous costomer",
            },
            stars : {
                type : Number,
                required : false,
                default : 0,
            },
            reviewContent : {
                type : String,
                required : true,
            },
            reviewImg : {
                type : String,
                required : false,
            },

        }

    }],
    
})

const product = mongoose.model("product", productSchema);

export default product
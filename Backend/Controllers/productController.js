import product from "../models/product.js";
import { isAdmin } from "./userController.js";

//<-- save products
export async function saveProduct(req,res){

    if(!isAdmin(req)){
        res.status(403).json({
            massage : "you are not authorized to add product. please login admin account."
        })
         return
    }

    const Product = new product(    
        req.body 
    )
 
try{
    const product = await Product.save()
    res.json({
        message : "product add successfull"
    })
     
    }catch(err){
        res.json(
            {
            message : "product add failed."+err
            }
        )
    }
}

//<-- view all products 
export async function getProduct(req,res){

    if(isAdmin(req)){
        res.status(403).json({
            massage : "you are not authorized to view products. please login admin account."
        })
         return
    }

    try{
        if(isAdmin(req)){
            const products = await product.find()
            res.json(products)

        }else{
            const products = await product.find({isAvailable : true})
            res.json(products)
        }

    }catch(err){
        res.json(
            {
                message : "product view failed"+ err,
            }
        )
   }
}

//<-- delete products
export async function deleteProduct(req,res){
    
    if(!isAdmin(req)){
        res.status(403).json({
            massage : "you are not authorized to delete product. please login admin account."
        })
         return
    }

    try{
        await product.deleteOne({productId : req.params.productId})
            res.json({
                message : "product delete successfully",
            })
    }catch(err){
        res.status(500).json({
            message : "product delete failed" +err,

            })
    }  
} 


//<-- update produts
export async function updateProduct(req,res) {

    if(!isAdmin(req)){
        res.status(403).json({
            massage : "you are not authorized to update product. please login admin account."
        })
         return
    }

    const productId = req.params.productId
    const updatingData = req.body

    try{  
        await product.updateOne(
            {productId : productId},updatingData
        )

        res.json({
            message : "product detials update successfully"
        })
        
    }catch(err){
        res.status(500).json({
            message : "produts update failed"+ err,
            })
    }
}

//<-- view products by id
export async function getProductById(req,res){
    
    if(!isAdmin(req)){
        res.status(403).json({
            massage : "you are not authorized to view product. please login admin account."
        })
         return
    }

    const productId = req.params.productId

    try{
        const Product = await product.findOne({productId : productId})

        if(Product == null){

            res.status(404).json({
                message : "product not found"
            })
            return
        }

        if(Product.isAvailable){
            res.json(Product)

        }else{
            if(isAdmin(req)){
                res.json({
                    message : "product is out of stokes"
                })

            }else{
                res.json(Product)

            }
        }
        
    }catch(err) {
        res.status(500).json({
            message : "product find failed",
            error : err
        })
    }
}

//<-- search products
export async function searchProducts(req, res){

    const searchQuery = req.params.query

    try{
        const products = await product.find({
            $or : [
                {name : {$regex : searchQuery, $options : "i"}},
                {altName : {$elemMatch : {$regex : searchQuery, $options : "i"}}},
            ]
        })
        res.json(products)
    }catch(err){
        res.status(500).json({
            message : "Internal sever error",
            error : err
        })
    }
}

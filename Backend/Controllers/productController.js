import product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function saveProduct(req,res){

    if(!isAdmin(req)){
        res.status(403).json({
            massage : "you are not authorized to add a products"
        })
         return
    }

    const Product = new product(
        //{
        // name : req.body.name,
        // id : req.body.id,
        // price : req.body.price,  
        //}
        req.body // මොඩෙල් එකේ සියල්ල ඇඩ කර ඇත මේ කෝඩ් එකෙන් ඒක කෙලින්ම ඇඩ් කල හැක.
    );
 
try{
    const product = await Product.save()
    res.json({
        message : "product add successfull"
    })
     
    }catch(err){
        res.json(
            {
            message : "product add fails",
            error : err  // err යනු පැරමීටර් නමක් වන අතර එය විශේශිත නමක් නොවේ. ෆන්ශ්ස්න් එකේ වීදිහ අනුව එය ඔටෝම සෑදී ඇත. අලුතෙන් සෑදීමට අවශ්‍ය නොවේ.
            }
        )
    }
}

//<-- view all 
export async function getProduct(req,res){
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
                message : "product view  failed",
                error : err
            }
        )
   }
}
// වෙනත් ලොකු ප්‍රොජෙක්ට් වල දී ඩිලිටඩ් වල true false kirmima pamanak karai

export async function deleteProduct(req,res){
    
    if(!isAdmin){
        res.status(403).json({
        message : "you are not authorized to delete product"
    })
    return
    }

    try{

        await product.deleteOne({productId : req.params.productId}) // paramas ==>>> url eken ewana parameter eka bhawitha kirimaat bhawotha karana standed kramamya we....  >>>
        res.json({
            message : "product delete successfully",

                })

    }catch(err){
        res.json({
            message : "delete fails",
            error : err,

                 }
        )
    }   
}


export async function updateProduct(req,res) {

    if(!isAdmin){
        res.status(403).json({
            message : "are you not a admin"
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
            message : "internal server error",
            error : err,
            }
         )
    }
}

export async function getProductById(req,res){

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
 // ඔබගේ model එක import කිරීමට වග බලා ගන්න

export async function addReview(req, res) {
    const reviewUser = req.user;
    const reviewInfo = req.body; 
    const productId = req.params.productId;

    // 1. User, admin කෙනෙක් දැයි පරීක්ෂා කිරීම
    if (reviewUser && reviewUser.role === "admin") {
        return res.status(403).json({  // 403 Forbidden ලෙස වෙනස් කරන ලදි
            message: "Admins can't add a review for a product",
        });
    }

    // 2. Body එක හිස් දැයි පරීක්ෂා කිරීම
    if (!reviewInfo || Object.keys(reviewInfo).length === 0) {
        return res.status(400).json({  // 400 Bad Request ලෙස වෙනස් කරන ලදි
            message: "Cannot add empty reviews. Please add review contents.",
        });
    }

    try {
        // 3. ✅ නිවැරදි කරන ලදි: array එකට review එක එක් කිරීමට $push භාවිතා කරන්න
        const updatedProduct = await product.updateOne(
            { productId: productId },
            { $push: { review: { reviewInfo: reviewInfo } } } // Schema එකට ගැළපෙන පරිදි සකසා ඇත
        );

        // Product එක ඇත්තටම සොයාගෙන update කළේදැයි පරීක්ෂා කිරීම
        if (updatedProduct.matchedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.json({
            message: "Product reviews updated successfully"
        });

    } catch (err) {
        console.error("Review Error:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
}

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
import order from "../models/order.js"
import product from "../models/product.js"
import { isAdmin } from "./userController.js"

export async function createOrder(req,res){

    const orderInfo = req.body
    const orderUser = req.user

    if(req.user == null){
        res.status(403).json({
            message : "login and try again"
        })
        return
    }

    if(!isAdmin){
        res.json({
            message : "admin can't create orders"
        })
        return
    }

    if(orderInfo.name == null){
        orderInfo.name = orderUser.firstName + " " + orderUser.lastName
    }
    //ORD00001
    var orderId = "ORD00001"
    
    const lastOrder = await order.find().sort({date : -1}).limit(1)

    if(lastOrder.length >  0){
        orderId = lastOrder[0]?.orderId ? "ORD" + String(parseInt(lastOrder[0].orderId.replace("ORD", "")) + 1).padStart(5, '0') : "ORD00001";
     
        }

    try{

        let total = 0
        let lableTotal = 0
        const products = []
        
        for(let i=0; i< orderInfo.orderProducts.length; i++){

            const item  =  await product.findOne({productId : orderInfo.orderProducts[i].productId})
            //console.log("Found Item from DB:", item);
            if(item == null) {
                res.status(404).json({
                    message : "Product with ProductId " + orderInfo.orderProducts[i].productId+ " is not found "
                })
                return
            }

            if(item.isAvailable == false){
                res.status(404).json({
                    message : "out of stokes"
                })
                return
            }
            const currentQuantity = orderInfo.orderProducts[i].quantity;

            products[i] = {
                productInfo : {
                    productId : item.productId,
                    name : item.productName,
                    altName : item.altName,
                    discription : item.description,
                    lablePrice : item.lablePrice,
                    price : item.lablePrice,
                    images : item.img[0],
                }, 
                quantity : currentQuantity
            }
            total = total + item.lablePrice * currentQuantity
            lableTotal = lableTotal + item.lablePrice * currentQuantity
        }

        const Order = new order({
            orderId : orderId,
            email : orderUser.email,
            name : orderInfo.name,
            address : orderInfo.address,
            total : total,
            lableTotal : lableTotal,
            phone : orderInfo.phone,
            orderProducts : products,
        })

          
                const createOrder = await Order.save()
                res.json
                    ({
                        message : "order create successfull",
                        order : createOrder
                    })

    }catch(err){
        res.status(500).json({
             message : "order creation failed",
             error : err
        })
       
    }  
}

export async function getOrder(req,res){

    if(req.user == null){
       res.status(403).json({
        message : "pleace login and try again",
       })
       return
    }

    try{
        if(req.user.role == "admin"){
            const orders = await order.find();
            res.json(orders);
        }else{
            const orders = await order.find({email: req.user.email});
            res.json(orders);
        }

    }catch(err){
        res.status(500).json({
            message : "Failed to fetch order",
            error : err,
        })
    }
}

export async function updateOderStatus(req, res){
    if(!isAdmin){
        res.status(500).json({
            message : "you are not authorized"
        })
        return
    }
   
    try{
        const orderId = req.params.orderId
        const status = req.params.status

        

        await order.updateOne({orderId : orderId },{status : status})
            res.json({
                message : "order update successfully"
            })
    }catch(err){
        res.json({
            message : "order status update failed",
            error : err
        })
    }
}



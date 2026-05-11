export function getCart(){
    
    let cart = localStorage.getItem("cart")
    cart = JSON.parse(cart)
    if(cart == null){
        cart = []
        localStorage.setItem("cart", JSON.stringify(cart)) //json convert to string
    }else{
        //cart = JSON.parse(cart);
    }
    return cart
}


export function removeFromCart(productId){
    let cart = getCart(productId);
    
    const newCart = cart.filter( // like map function using 
        (item) => {
            return  item.productId != productId
        }
    )
    localStorage.setItem("cart", JSON.stringify(newCart));
}

export function addCart(product, qty){

    let cart = getCart()
    let index = cart.findIndex( // using to find product id have value in to the place index
        (item) => {
            return item.productId == product.productId // is not find productId index = -1
        }) // 

    if(index == -1){
        cart[cart.length] = {
            productId : product.productId,
            productName : product.productName,
            img : product.img[0],
            lablePrice : product.lablePrice,
            qty : qty,
        }
        }else{
            const NewQty = cart[index].qty + qty;
            if(NewQty <= 0){
               removeFromCart(product.productId)
               return;
            }else{
                cart[index].qty = NewQty
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart))
      

}


export function clearCart() {
    localStorage.setItem("cart", JSON.stringify([]));
}

export function getTotle(){
    let cart = getCart();
    let totle = 0

    for(let i=0; i<cart.length; i++){
        totle += cart[i].lablePrice * cart[i].qty
    }

    return totle
}

const cartModel = require('../models/cart');
const ctrl = {};

ctrl.addItemToCart = async (req, res, next) => {
    const body = req.body;
    console.log(body);
    await cartModel.findOne({user: req.userId}, async (err, cart) => {
            if(err) {
                
                res.status(400).json({err})}
            if(cart) {
                //if cart already exists then update cart by quantity 
                //res.status(200).json({message: cart});

                //found product already exists in the cart
                const product = body.cartItems.product;
                const item = cart.cartItems.find(c => c.product == body.cartItems.product);
                //add product quantity already exists in the cart
                let condition, update;
                if(item) {
                    condition = {"user": req.userId, "cartItems.product": product }
                    update = {"$set": {
                            "cartItems.$": body.cartItems
                        }}        
                }else{
                    condition = {user: req.userId};
                    update = {"$push": {
                        "cartItems": req.body.cartItems
                        }}
                    }

                await cartModel.findOneAndUpdate(condition, update, (err,_cart) => { 
                    if(err) {res.status(400).json({message: err})}
                    if(_cart){
                        return res.status(200).json({message: _cart})
                    }
                });

            }else{
                console.log(req.userId);
                console.log(body.cartItems);
                //if not exists create new cart
                const newCart = new cartModel({
                    user: req.userId,
                    cartItems: body.cartItems
                });
                await newCart.save((err, cart) => {
                    if(err) {res.status(400).json({message: err})}
                    if(cart) {res.status(200).json(cart)}
                });
            }
        });
};
module.exports = ctrl;
const cartModel = require('../models/cart');
const ctrl = {};

ctrl.addItemToCart = async (req, res) => {
    const body = req.body;
    await cartModel.find({user: body.user._id}, async (err, cart) => {
            if(err) {res.status(400).json({err})}
            if(cart) {
                //if cart already exists then update cart by quantity 
                //res.status(200).json({message: cart});

                //found product already exists in the cart
                const product = body.cartItems.product;
                const item = cart.cartItems.find(c => c.product == body.cartItems.product);
                //add product quantity already exists in the cart
                if(item) {
                    await cartModel.findOneAndUpdate({"user": body.user._id, "cartItems.product": product },{
                        "$set": {
                            "cartItems": {
                                ...body.cartItems,
                                quantity: item.quantity + body.carItems.quantity
                            }
                        }
                    },
                    (err,_cart) => { 
                        if(err) {res.status(400).json({message: err})}
                        if(_cart){
                            return res.status(200).json({message: _cart})
                        }
                    });
                }
                await cartModel.findOneAndUpdate({user: body.user._id},{
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                },
                (err,_cart) => { 
                    if(err) {res.status(400).json({message: err})}
                    if(_cart){
                        return res.status(200).json({message: _cart})
                    }
                });
                

            }else{
                //if not exists create new cart
                const newCart = new cartModel({
                    user: body.user._id,
                    cartItems: body.carItems
                });
                await newCart.save((err, cart) => {
                    if(err) {res.status(400).json({message: err})}
                    if(cart) {res.status(200).json(cart)}
                });
            }
        });
};

module.exports = ctrl;
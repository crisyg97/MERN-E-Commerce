const productModel = require('../models/product');
const ctrl = {}

ctrl.index = async (req, res, next) => {
    await productModel.find((err,product) => {
        if(err) {console.log(err)}
        res.status(200).json({
            product : product
        });       
    });
}

ctrl.create = async (req, res, next) => {
    const body = req.body;
    const newProduct = new productModel({
        name: body.name,
        price: body.price,
        description: body.description,
        ratings: body.ratings,
        image: body.image,
        category: body.category,
        stock: body.stock,
        numOfRevews: body.numOfRevews,
        reviews: body.reviews
    });
    newProduct.save((err,product) => {
        if(err) {res.status(400).json(err)}
        if(product) {res.status(200).json(product)}
    })
}

ctrl.getById = async (req, res, next) => {
    const id = req.params.product_id;
    await productModel.findById({_id:id}, (err,productDb) => {
        console.log("product found: ", productDb);
        if(err) {console.log(err)}
        if(!productDb) {
            res.status(400).json({
                message: 'product not found'
            });
        }else{
            res.status(200).json({
                product: productDb
            });
        }
    });
}

ctrl.update = async (req, res, next) => {
    const id = req.params.product_id;
    const body = req.body;
    await productModel.findOne({_id:id}, (err, productDb) => {
        if(err) {console.log(err)}
        else
            if(!productDb) {res.status(400).json({ message: 'product not found'})}
            else{
                productDb.name= body.name,
                productDb.price= body.price,
                productDb.description= body.description,
                productDb.ratings= body.ratings,
                productDb.image= body.image,
                productDb.category= body.category,
                productDb.stock= body.stock,
                productDb.numOfRevews= body.numOfRevews,
                productDb.reviews= body.reviews
            }
            productDb.save((err) => {
                if(err) {return res.status(400).json({ message: 'something went wrong'})}
                res.status(200).json({
                    succes: true
                });
            })

    })
}

ctrl.remove = async (req, res, next) => {
    const id = req.params.product_id;
    await productModel.findOne({_id:id}, (err,productDb) => {
        if(err) {
            res.status(400).json({ message: 'something went wrong'})}
        else
            if(!productDb) {res.status(400).json({message: 'product not found'})}
            else{
                productDb.status = 'INACTIVE';
                
                productDb.save((err) => {
                    if(err) {res.status(400).json({ message: 'something went wrong'})}
                    res.status(200).json({
                        success: true
                    });
                })
                
            }
    })
}

module.exports = ctrl;
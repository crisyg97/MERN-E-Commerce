const productModel = require('../models/product');
const ctrl = {}

ctrl.index = async (req, res, next) => {
    await productModel.find((err,product) => {
        if(err) {console.log(err)}
        res.send({
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
        reviews: body.reviews,
        createdAt: body.createdAt
    });
    const product = await productModel.create(newProduct); //create and save model
}

ctrl.getByID = async (req, res, next) => {
    const id = req.params.product_id;;
    await productModel.findById({_id:id}, (productDb,err) => {
        if(err) {console.log(err)}
        res.send({
            product: productDb
        });
    })
}

ctrl.update = async (req, res, next) => {
    const id = req.params.product_id;
    const body = req.body;
    await productModel.findOne({_id:id}, (productDb,err) => {
        if(err) {console.log(err)}
        else
            if(!user) {console.log('product not found')}
            else{
                productDb.name= body.name,
                productDb.price= body.price,
                productDb.description= body.description,
                productDb.ratings= body.ratings,
                productDb.image= body.image,
                productDb.category= body.category,
                productDb.stock= body.stock,
                productDb.numOfRevews= body.numOfRevews,
                productDb.reviews= body.reviews,
                productDb.createdAt= body.createdAt
            }
            productDb.save((err) => {
                if(err) {console.log(err)}
                res.send({
                    succes: true
                });
            })

    })
}

ctrl.remove = async (req, res, next) => {

}

module.exports = ctrl;
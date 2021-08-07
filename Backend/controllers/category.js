const categoryModel = require('../models/category');
const slugify = require('slugify');

const ctrl = {};

ctrl.index = async (req, res, next) => {
    await categoryModel.find((err,categories) => {
        if(err){
            console.log(err);
            return res.status(400).json({message: 'something went wrong'});
        }
        if(categories){
            return res.status(200).json({categories});
        }
    })
}

ctrl.getById = (req, res, next) => {

}

ctrl.create = async (req, res, next) => {
    const body = req.body;
    const categoryReq = {
        name: body.name,
        slug: slugify(body.name)
    }
    if(body.parentId){
        categoryReq.parentId = body.parentId;
    }
    const category = new categoryModel(categoryReq);
    await category.save((err, category) => {
        if(err) {
            console.log(err);
            return res.status(400).json({message: 'something went wrong'});
        }
        if(category){
            return res.status(200).json({message: category});
        }
    })
}

ctrl.update = async (req, res, next) => {
    const id = req.params.category_id;
    const body = req.body;
    await categoryModel.findOne({_id:id}, (err, categoryDb) => {
        if(err){
            console.log(err);
            return res.status(400).json({message: 'something went wrong'});
        }
        if(!categoryDb) {
            res.status(400).json({message: 'category not found'});
        }else{
            categoryDb.name = body.name,
            categoryDb.slug = body.slug,
            categoryDb.parentId = body.parentId
        }
        categoryDb.save((err) => {
            if(err) {
                console.log(err);
                return res.status(400).json({message: 'something went wrong'});
            }
            return res.status(200).json({success: true});
        });
    })
}

ctrl.remove = (req, res, next) => {
    
}


module.exports = ctrl;
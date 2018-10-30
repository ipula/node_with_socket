const mongoose = require('mongoose');
const Product = require('../models/product');

exports.get_products = (res, req, next) => {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            if (docs) {
                res.status(200).json({
                    message: "listing all products",
                    product: docs
                });
            } else {
                res.status(404).json({
                    error: "products not found",
                });
            }
        }).catch(err => {
            res.status(500).json({
                error: err,
            });
        });
};

exports.add_products = (res, req, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save().then(result => {
        res.status(201).json({
            message: "handling post requets",
            createdProduct: product
        });
    }).catch(err => {
        res.status(500).json({
            error: err,
        });
    });
};

exports.get_a_single_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    message: "ID with product",
                    createdProduct: doc
                });
            } else {
                res.status(404).json({
                    error: "product not found",
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        });
};

exports.update_product = (req, res, next) => {
    const id = req.params.productId;
    Product.update({ _id: id }, { $set: { name: req.body.name, price: req.body.price } })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    message: "updated product",
                    updateProduct: doc
                });
            } else {
                res.status(404).json({
                    error: "product not found",
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        });
};

exports.delete_product = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "product deleted",
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        });
}
const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.orders_get_all =(req, res, next) => {
    Order.find()
        .select("product quantity _id")
        .populate("product","name")
        .exec()
        .then(docs => {
            if (docs) {
                res.status(200).json({
                    message: "listing all orders",
                    orders: docs
                });
            } else {
                res.status(404).json({
                    error: "order not found",
                });
            }
        }).catch(err => {
            res.status(500).json({
                error: err,
            });
        });
};

exports.add_a_order =(req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                res.status(404).json({
                    message: "product not found",
                    error: err,
                });
            } else {
                const order = new Order({
                    _id: mongoose.Types.ObjectId(),
                    product: product,
                    quantity: req.body.quantity
                });
                order.save()
                    .then(result => {
                        res.status(201).json({
                            message: "Order was created",
                            order: order
                        });
                    }).catch(err => {
                        res.status(500).json({
                            message: "order create faild",
                            error: err,
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "product not found",
                error: err,
            });
        });
};

exports.get_a_order=(req,res,next)=>{
    const id = req.params.orderId;
    Order.findById(id)
    .exec()
    .then(doc => {
        if (doc) {
            res.status(200).json({
                message: "ID with order",
                createdProduct: doc
            });
        } else {
            res.status(404).json({
                error: "order not found",
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err,
        });
    })
};

exports.update_order=(req,res,next)=>{
    const id = req.params.orderId;
    res.status(200).json({
        message: "order updated"
    });
};

exports.delete_order=(req,res,next)=>{
    const id = req.params.orderId;
    Order.remove({ _id: id })
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "order deleted",
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        });
};

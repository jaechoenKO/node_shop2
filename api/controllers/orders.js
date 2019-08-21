const mongoose = require('mongoose');
const OrderModel = require('../models/order');

exports.orders_get_all =  (req, res) => {
    OrderModel
        .find()
        .exec()
        .then(docs => {
            res.status(200).json({
                msg: "show Order List",
                orders: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.orders_get_orderId = (req, res) => {
    const id = req.params.orderId;
    
    OrderModel
        .findById(id)
        .exec()
        .then(doc => {
            if (!doc) {
                return res.status(404).json({
                    msg: "not found ordersId"
                });
            }else {
                res.status(200).json({
                    msg: "success find oderId",
                    orderInfo: doc
                });
            }
        })
        .catch(err => {
            res.status(200).json({
                error: err
            });
        });
};

exports.orders_register_order = (req, res) => {

    ProductModel
        .findById(req.body.productId)
        // product check
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    msg: "not found productId"
                });
            } else {
                const order = new OrderModel({
                    _id: mongoose.Types.ObjectId(),
                    product: req.body.productId,
                    quantity: req.body.quantity
                });
                return order.save();
            }
        })
        // 화면 뿌려줌.
        .then(result => {
            res.status(201).json({
                msg: "Order stored",
                createdOrder: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });  
};

exports.orders_update_order = (req, res) => {

    const id = req.params.orderId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    OrderModel
        .update({_id: id}, {$set: updateOps})
        .exec()
        .then(doc => {
            if (!doc) {
                return res.status(404).json({
                    msg: "not found orderId"
                });
            } else {
                res.status(200).json({
                    msg: "successful ",
                    updateOps: doc
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.orders_delete_order = (req, res) => {

    const id = req.params.orderId;
    
    OrderModel
        .remove({_id: id})
        .exec()
        .then(doc => {
            if (!doc) {
                res.status(404).json({
                    msg: "not found oderId"
                });
            } else {
                res.status(200).json({
                    msg: "success remove oderId"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
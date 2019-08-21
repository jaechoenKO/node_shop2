const express = require('express');
const router = express.Router();
const OrderModel = require('../models/order');
const ProductModel = require('../models/product');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

router.get('/', (req, res) => {
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
});

router.post('/', checkAuth, (req, res) => {

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
    
});

router.get('/:orderId', checkAuth, (req, res) => {
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
})

/**
 * 수정하기 update
 */
router.patch('/', checkAuth, (req, res) => {

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
});

router.delete('/:orderId', checkAuth, (req, res) => {

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
});

// 모듈 내보내기. 
module.exports = router;
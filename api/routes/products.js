const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productModel = require('../models/product');


// 전체 데이터 불러오기.
router.get('/', (req, res) => {
    // res.status(200).json({
    //     msg: 'data 불러옴.'
    // });
    productModel
        .find()
        .then(docs => {
            res.status(201).json({
                msg: "successful get all data",
                count: docs.length,
                products: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


// product data 등록.
router.post('/', (req, res) => {

    const product = new productModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                msg: "successfull product Post",
                createProduct: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });


});

router.patch('/', (req, res) => {
    res.status(200).json({
        msg: 'data 수정됨.'
    });
});

router.delete('/', (req, res) => {
    res.status(200).json({
        msg: 'data 삭제됨.'
    });
});













// 모듈 내보내기. 
module.exports = router;
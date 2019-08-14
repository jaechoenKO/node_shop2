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

// :productId 세미콜론을 제외하면 그냥 url이 된다. 
router.get('/:productId', (req, res) => {
    
    // url 주소를 받아 올 떄는 params. 브라우저에서 값일 때는 body
    const id = req.params.productId;

    productModel
        .findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                return res.status(200).json({
                    msg: "success full detail product",
                    productInfo: doc
                });
            } else {
                res
                    .status(404)
                    .json({msg: "No valid entry fount"});
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

    // res.status(201).json({
        
    // });
})

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
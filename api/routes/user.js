const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// 암호화 하기 위한 라이브러리
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user');

router.get('/all', (req, res) => {

    UserModel
        .find()
        .exec()
        .then(result => {
            res.status(200).json({
                msg: "success load all Users",
                userList: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});


// 유저 등록 url : localhost:3000/user/register
router.post('/register', (req, res) => {
    
    UserModel
        .find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    msg: "please check your email"
                });
            } else {
                // password 값 첫번 째 암호화 할 값, 두번 째 자리수, 3번 째 에러가 있거나 hash가 있거나.
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new UserModel({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });

                        user
                            .save()
                            .then(result => {
                                res.status(200).json({
                                    msg: "success user Created",
                                    userInfo: result
                                });
                            })
                            // 도메인 체크
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


router.delete('/:userId', (req, res) => {

    const id = req.params.userId;

    UserModel
        .remove({_id: id})
        .exec()
        .then(user => {
            if (!user) {
                res.status(404).json({
                    msg: "not found user"
                });
            } else {
                res.status(200).json({
                    msg: "delete user"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});







module.exports = router;
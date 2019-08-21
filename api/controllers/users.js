const mongoose = require('mongoose');
const UserModel = require('../models/user');
// 암호화 하기 위한 라이브러리
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.users_get_all =  (req, res) => {

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

};

exports.users_get_userId = (req, res) => {

    const id = req.params.userId;

    UserModel
        .findById(id)
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    msg: "not found userId"
                });
            } else {
                res.status(200).json({
                    msg: "success found userId",
                    user: result
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.users_register_user = (req, res) => {
    
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
};

exports.users_update_user = (req, res) => {
    const id = req.params.userId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    UserModel
        .update({_id: id}, {$set: updateOps})
        .exec()
        .then(doc => {
            if (!doc) {
                return res.status(404).json({
                    msg: "fail update data"
                });
            } else {
                res.status(200).json({
                    msg: "success update data",
                    updateData: doc
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.users_delete_user = (req, res) => {

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
};

exports.users_login_user = (req, res) => {

    UserModel
        // 사용자 입력 이메일값 확인
        .find({email: req.body.email})
        .exec()
        .then(user => {
            if (!user) {
                res.status(404).json({
                    msg: "not found user"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        msg: "not match password"
                    });
                }
                // 토큰 생성
                if (result) {
                    // 토큰 생성은 sign으로 한다.
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                        // 토큰 유지 시간 expiresIn 1h 1시간, 1m 1분, 1s 1초 (1000/1)이니 1초는 1000초
                        "secret", { expiresIn: "1h" }
                    );
            
                return res.status(200).json({
                    msg: "successful Auth",
                    token: "Bearer " + token
                });
            }
        
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
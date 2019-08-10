const express = require('express');
const router = express.Router();




router.get('/', (req, res) => {
    res.status(200).json({
        msg: 'data 불러옴.'
    });
});

router.post('/', (req, res) => {
    res.status(200).json({
        msg: 'data 등록됨.'
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
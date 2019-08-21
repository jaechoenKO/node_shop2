const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const userController = require('../controllers/users');

// 전체 유저 찾기
router.get('/all', userController.users_get_all);
// 단일 유저 찾기
router.get('/:userId', userController.users_get_userId);
// 유저 등록 url : localhost:3000/user/register
router.post('/register', userController.users_register_user);
// 유저 수정
router.patch('/:userId', checkAuth, userController.users_update_user);
// 유저 삭제
router.delete('/:userId', checkAuth, userController.users_delete_user);
// 로그인
router.post('/login', userController.users_login_user);

module.exports = router;
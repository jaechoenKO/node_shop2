const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const orderController = require('../controllers/orders');

router.get('/', orderController.orders_get_all);
router.post('/', checkAuth, orderController.orders_register_order);
router.get('/:orderId', checkAuth, orderController.orders_get_orderId);
/**
 * 수정하기 update
 */
router.patch('/', checkAuth, orderController.orders_update_order);
router.delete('/:orderId', checkAuth, orderController.orders_delete_order);

// 모듈 내보내기. 
module.exports = router;
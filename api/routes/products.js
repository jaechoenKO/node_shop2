const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth'); // 토큰 검증 모듈
const productController = require('../controllers/products');

// 전체 데이터 불러오기.
router.get('/', productController.products_get_all);
// product data 등록.
router.post('/', checkAuth, productController.products_create_product);
// :productId 세미콜론을 제외하면 그냥 url이 된다. 
router.get('/:productId', productController.products_get_productId);
router.patch('/:productId', checkAuth, productController.products_update_product);
router.delete('/:productsId', checkAuth, productController.products_delete_product);


// 모듈 내보내기. 
module.exports = router;
const express = require('express');
const router = express.Router();
const OrdersController = require('../controller/orders');
const checkAuth= require('../middleware/checkAuthMiddleware');

router.get('/', checkAuth,OrdersController.orders_get_all);

router.post('/', checkAuth,OrdersController.add_a_order);

router.get('/:orderId', checkAuth,OrdersController.get_a_order);

router.patch('/:orderId', checkAuth,OrdersController.update_order);

router.delete('/:orderId',checkAuth,OrdersController.delete_order);

module.exports = router;


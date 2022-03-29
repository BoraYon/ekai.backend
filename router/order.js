const express = require('express');
const router = express.Router();
const orderController = require('../controller/order.controller');

router.get('/', orderController.findAll);
router.post('/', orderController.create);
//router.get('/:customerId', customerController.findOne);
//router.put('/:customerId', customerController.update);
//router.delete('/:customerId', customerController.delete);

module.exports = router;

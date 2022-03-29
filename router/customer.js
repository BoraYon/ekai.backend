const express = require('express');
const router = express.Router();
const customerController = require('../controller/cutomer.controller');

router.get('/', customerController.findAll);
router.post('/', customerController.create);
router.get('/:customerId', customerController.findOne);
//router.put('/:customerId', customerController.update);
//router.delete('/:customerId', customerController.delete);

module.exports = router;

const express = require('express');
const router = express.Router();
const bookController = require('../controller/book.controller');

router.get('/', bookController.findAll);
router.post('/', bookController.create);
router.get('/:bookId', bookController.findOne);
router.put('/:bookId', bookController.update);
router.delete('/:bookId', bookController.delete);

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

router.get('/', controller.getAllProducts);
router.get('/:slug', controller.getProductBySlug);
router.get('/admin/:id', controller.getProductById);
router.get('/tags/:tag', controller.getProductByTag);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.post('/:id', controller.delete);

module.exports = router;
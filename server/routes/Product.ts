// const express = require("express");
import express from "express"
const router = express.Router();

const { getAllProducts, getProductById, getProductByCategory, searchProducts, getAllCategories } = require('../controllers/Products');

router.get('/getAllProducts', getAllProducts);
router.get('/getProductById/:id', getProductById);
router.get('/getProductByCategory/:category', getProductByCategory);
router.get('/searchProducts', searchProducts);
router.get('/getAllCategories', getAllCategories);

export default router;
// module.exports = router;
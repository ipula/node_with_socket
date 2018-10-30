const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const multer = require('multer');
const checkAuth= require('../middleware/checkAuthMiddleware');
const ProductController = require('../controller/products');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFliter=(req, file, cb)=>{
  if(file.mimetype==='image/jpeg' || file.mimetype=== 'image/png'){
      cb(null,true);
  }else{
    cb(new Error('message'),false);
  }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFliter
});


router.get('/',ProductController.get_products);

router.post('/',checkAuth, upload.single('productImage'),ProductController.add_products);

router.get('/:productId',ProductController.get_a_single_product);

router.patch('/:productId', checkAuth,ProductController.update_product);

router.delete('/:productId',checkAuth,ProductController.delete_product);

module.exports = router;


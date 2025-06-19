const express = require('express');
const router = express.Router();
const { submitReview, getAllProducts, getProductReviews, updateReview } = require('../controllers/reviewController');
const upload = require('../middlewares/multer');

router.post('/review/:productId', upload.single("image"), submitReview);
router.put('/review/:productId', upload.single("image"), updateReview);  // 🆕
router.get('/products', getAllProducts);
router.get('/reviews/:productId', getProductReviews);

module.exports = router;
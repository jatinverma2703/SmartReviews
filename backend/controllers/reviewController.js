const db = require('../models/db');
const cloudinary = require('../utils/cloudinary');

exports.getAllProducts = (req, res) => {
  const query = `
    SELECT p.id, p.name, p.image_url,
      ROUND(AVG(r.rating), 1) as avg_rating,
      COUNT(r.id) as total_reviews
    FROM products p
    LEFT JOIN reviews r ON p.id = r.product_id
    GROUP BY p.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getProductReviews = (req, res) => {
  const { productId } = req.params;
  const query = `
    SELECT u.email, r.review, r.rating, r.created_at, r.image_url
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.product_id = ?
    ORDER BY r.created_at DESC
  `;
  db.query(query, [productId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.submitReview = async (req, res) => {
  const { productId } = req.params;
  const { email, rating, review } = req.body;
  let imageUrl = null;

  try {
    if (!email || (!rating && !review)) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const parsedRating = parseInt(rating, 10) || null;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "reviews"
      });
      imageUrl = uploadResult.secure_url;
    }

    db.query('SELECT id FROM users WHERE email = ?', [email], (err, result) => {
      if (err) return res.status(500).json(err);

      const userId = result.length ? result[0].id : null;

      const insertReview = (uid) => {
        db.query(
          'SELECT * FROM reviews WHERE user_id = ? AND product_id = ?',
          [uid, productId],
          (err, existing) => {
            if (err) return res.status(500).json(err);
            if (existing.length > 0) {
              return res.status(400).json({ message: "Already reviewed this product." });
            }

            db.query(
              'INSERT INTO reviews (user_id, product_id, rating, review, image_url) VALUES (?, ?, ?, ?, ?)',
              [uid, productId, parsedRating, review || null, imageUrl],
              (err) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Review submitted successfully." });
              }
            );
          }
        );
      };

      if (userId) {
        insertReview(userId);
      } else {
        db.query('INSERT INTO users (email) VALUES (?)', [email], (err, result) => {
          if (err) return res.status(500).json(err);
          insertReview(result.insertId);
        });
      }
    });
  } catch (err) {
    console.error("❌ Error uploading review:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  const { productId } = req.params;
  const { email, rating, review } = req.body;
  let imageUrl = null;

  try {
    if (!email) return res.status(400).json({ message: "Email required" });

    const parsedRating = parseInt(rating, 10) || null;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "reviews"
      });
      imageUrl = uploadResult.secure_url;
    }

    db.query('SELECT id FROM users WHERE email = ?', [email], (err, result) => {
      if (err) return res.status(500).json(err);
      if (!result.length) return res.status(404).json({ message: "User not found" });

      const userId = result[0].id;
      const updateFields = [];
      const values = [];

      if (parsedRating) {
        updateFields.push("rating = ?");
        values.push(parsedRating);
      }
      if (review) {
        updateFields.push("review = ?");
        values.push(review);
      }
      if (imageUrl) {
        updateFields.push("image_url = ?");
        values.push(imageUrl);
      }

      if (updateFields.length === 0) {
        return res.status(400).json({ message: "Nothing to update" });
      }

      values.push(userId, productId);
      const query = `UPDATE reviews SET ${updateFields.join(", ")} WHERE user_id = ? AND product_id = ?`;

      db.query(query, values, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Review not found for update" });
        }
        res.json({ message: "Review updated successfully" });
      });
    });
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

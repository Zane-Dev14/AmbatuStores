// backend/routes/products.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/saveProducts', async (req, res) => {
  const products = req.body;

  try {
    // Insert all products into MongoDB
    const savedProducts = await Product.insertMany(products);
    res.status(201).json(savedProducts);
  } catch (error) {
    console.error('Error saving products:', error);
    res.status(500).json({ error: 'Failed to save products' });
  }
});

module.exports = router;

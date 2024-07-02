const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/product');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://22cs258:6NxcdL7TmRe8bHgn@cluster0.t6j40rh.mongodb.net/webstore', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

app.listen(port, () => console.log(`Server running on port ${port}`));

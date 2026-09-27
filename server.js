const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Product data
let products = [
  {
    id: 1,
    name: 'Laptop Cloud Native',
    description: 'Laptop for cloud computing and programming',
    price: 15000000,
    quantity: 10
  },
  {
    id: 2,
    name: 'Kubernetes Book',
    description: 'Book about Kubernetes and Cloud Native',
    price: 220000,
    quantity: 20
  },
  {
    id: 3,
    name: 'Microservices Guide',
    description: 'Introduction to Microservices Architecture',
    price: 180000,
    quantity: 15
  }
];

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Product Service'
  });
});

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(
    p => p.id === parseInt(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: 'Product not found'
    });
  }

  res.json(product);
});

// POST create a new product
app.post('/api/products', (req, res) => {
  const { name, description, price, quantity } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: 'Name and price are required'
    });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    description: description || '',
    price: Number(price),
    quantity: Number(quantity) || 0
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

// Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '123456') {
    return res.json({
      message: 'Login successful',
      username
    });
  }

  res.status(401).json({
    message: 'Invalid username or password'
  });
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});
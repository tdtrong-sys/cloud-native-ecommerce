const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let orders = [];

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Order Service'
  });
});

// Create Order
app.post('/api/orders', (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({
      message: 'productId and quantity are required'
    });
  }

  const order = {
    id: orders.length + 1,
    productId: Number(productId),
    quantity: Number(quantity),
    status: 'created'
  };

  orders.push(order);

  res.status(201).json(order);
});

// Get Orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
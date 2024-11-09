const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/user', userRoutes);
app.use('/car', carRoutes);
app.use('/order', orderRoutes);
app.use('/product', productRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

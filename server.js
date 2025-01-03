require('dotenv').config();
const express = require('express');
const cryptoRoutes = require('./routes/crypto');
const stockRoutes = require('./routes/stock');

const app = express();
app.use(express.json());


app.use('/api/crypto', cryptoRoutes);
app.use('/api/stock', stockRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

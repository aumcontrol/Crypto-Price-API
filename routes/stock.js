const express = require('express');
const axios = require('axios');
const cache = require('../utils/cache');

const router = express.Router();
const API_URL = process.env.STOCK_API_URL;

router.get('/:ticker', async (req, res) => {
    const { ticker } = req.params;
    const cacheKey = `stock-${ticker}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        return res.json({ source: 'cache', data: cachedData });
    }

    try {
        const response = await axios.get(`${API_URL}/${ticker}`);
        const priceData = response.data;

        if (!priceData) {
            return res.status(404).json({ error: 'Ticker not found' });
        }

        cache.set(cacheKey, priceData);
        res.json({ source: 'api', data: priceData });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
});

module.exports = router;

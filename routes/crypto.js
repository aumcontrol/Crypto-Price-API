const express = require('express');
const axios = require('axios');
const cache = require('../utils/cache');

const router = express.Router();
const API_URL = process.env.CRYPTO_API_URL;

router.get('/:ticker', async (req, res) => {
    const { ticker } = req.params;
    const cacheKey = `crypto-${ticker}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        return res.json({ source: 'cache', data: cachedData });
    }

    try {
        console.log("API_URL:", API_URL);
        const response = await axios.get(API_URL, {
            params: { ids: ticker, vs_currencies: 'usd' }
        });
        const priceData = response.data;

        if (!priceData[ticker]) {
            return res.status(404).json({ error: 'Ticker not found' });
        }

        cache.set(cacheKey, priceData[ticker]);
        res.json({ source: 'api', data: priceData[ticker] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
});

module.exports = router;

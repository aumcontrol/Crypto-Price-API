const NodeCache = require('node-cache');
module.exports = new NodeCache({ stdTTL: 300 }); // Cache TTL: 5 minutes

// @ts-check
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '.env'),
});

require('./ticketing');
require('./platform');

'use strict';

const { promise: request } = require('../index.js');

request
(
    {
        method: 'GET',
        path: 'https://localhost:3060',
        tls:
        {
            cert: './cert.pem',
            key: './key.pem',
            rejectUnauthorized: false
        }
    }
);
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const https = require('https');
const cors = require('cors');

// Create Express Server
const app = express();
app.use(cors());

// Configuration
const PORT = 3001;
const Google_API_URL = "https://www.googleapis.com/books/v1";
const Google_API_KEY = "AIzaSyDADBgANYfFbJxvy4QRg0ojpdcn2YZIVLA";
const NYT_API_URL = "https://api.nytimes.com/svc/books/v3";
const NYT_API_KEY = "PkJUjvVjGnD42aLraTeZvlrbxskGTtqe";
const privateKey = fs.readFileSync( 'key.pem' );
const certificate = fs.readFileSync( 'cert.pem' );

 app.use('/gbooks', createProxyMiddleware({
    target: Google_API_URL,
    changeOrigin: true,
    pathRewrite: function (path) {
        path = path.replace('/gbooks', '');
        path += Google_API_KEY;
        console.log(path);
        return path;
    },
 }));

 app.use('/nyt', createProxyMiddleware({
    target: NYT_API_URL,
    changeOrigin: true,
    pathRewrite: function (path) {
        path = path.replace('/nyt', '');
        path += NYT_API_KEY;
        console.log(path);
        return path;
    },
 }));

 https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(PORT);
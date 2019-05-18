const express = require('express');
const path = require('path');
const packageJson = require('./package.json');

const distPath = path.resolve(`${__dirname}/dist`);

const port = process.env.PORT || 8080;
const app = express();

let sources = {
  'default-src': ["'self'"],
  'script-src': ["'self'", 'https://*.myexternalcdn.com'],
  'frame-src': ['https://someexternalframesource.com'],
  'img-src': ["'self'", 'https:', 'data:'],
  'style-src': ["'self'", 'https:', 'data:'],
  'font-src': ["'self'", 'https:', 'data:'],
  'connect-src': ["'self'"],
};

let csp = Object.keys(sources).map(function(key) {
  return `${key} ${sources[key].join(' ')};`;
});

// the __dirname is the current directory from where the script is running
app.use(express.static(distPath));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Content-Security-Policy', csp.join(' '));
  next();
});

// serve the health check end-point
app.get('/health', (req, res) => {
  res.json({
    ok: true,
    version: packageJson.version,
  });
});

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(`${distPath}/index.html`);
});

app.listen(port);

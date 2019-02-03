const express = require('express');
const path = require('path');
const packageJson = require('./package.json');

const distPath = path.resolve(`${__dirname}/dist`);

const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(distPath));

// serve the health check end-point
app.get('/health', (req, res) => {
  res.json({
    ok: true,
    version: packageJson.version,
  });
});

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  console.log(path.resolve(__dirname, 'dist/index.html'));
  res.sendFile(`${distPath}/index.html`);
});

app.listen(port);

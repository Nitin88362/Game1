const express = require('express');
const path = require('path');
const app = express();

// Serve static files from current directory
app.use(express.static(path.join(__dirname)));

// Route for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'one.html'));
});

// Route for /one
app.get('/one', (req, res) => {
  res.sendFile(path.join(__dirname, 'one.html'));
});

// Route for /two
app.get('/two', (req, res) => {
  res.sendFile(path.join(__dirname, 'two.html'));
});

// Route for /three
app.get('/three', (req, res) => {
  res.sendFile(path.join(__dirname, 'three.html'));
});

// Catch-all for static files and routes
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, req.path);
  
  // Check if it's asking for an HTML file
  if (req.path.includes('.html')) {
    res.sendFile(filePath);
  } else if (req.path.endsWith('/')) {
    // Try index or default
    res.sendFile(path.join(__dirname, 'one.html'));
  } else {
    // Try to serve as static file
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).send('Not Found');
      }
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

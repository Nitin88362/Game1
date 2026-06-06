const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Get the requested path
  let filePath = req.url;
  
  // Remove query string
  if (filePath.includes('?')) {
    filePath = filePath.split('?')[0];
  }

  // Default to one.html for root
  if (filePath === '/' || filePath === '') {
    filePath = '/one.html';
  }

  // Specific game routes
  if (filePath === '/one') {
    filePath = '/one.html';
  } else if (filePath === '/two') {
    filePath = '/two.html';
  } else if (filePath === '/three') {
    filePath = '/three.html';
  }

  // Build full file path
  const fullPath = path.join(process.cwd(), filePath);

  try {
    // Check if file exists
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      
      // Set content type based on file extension
      const ext = path.extname(fullPath).toLowerCase();
      let contentType = 'text/html';
      
      if (ext === '.js') contentType = 'application/javascript';
      else if (ext === '.css') contentType = 'text/css';
      else if (ext === '.json') contentType = 'application/json';
      else if (ext === '.png') contentType = 'image/png';
      else if (ext === '.jpg') contentType = 'image/jpeg';
      else if (ext === '.gif') contentType = 'image/gif';
      else if (ext === '.svg') contentType = 'image/svg+xml';
      
      res.setHeader('Content-Type', contentType);
      res.status(200).send(content);
    } else {
      // File not found - serve one.html as fallback
      const onePath = path.join(process.cwd(), 'one.html');
      const content = fs.readFileSync(onePath, 'utf-8');
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(content);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

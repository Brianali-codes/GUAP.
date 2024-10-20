const express = require('express');
const axios = require('axios'); // Use axios instead of request
const app = express();

// Proxy endpoint to handle requests to the external API
app.get('/api/giveaways', async (req, res) => {
  try {
    // Make a request to the external API using axios
    const response = await axios.get('https://www.gamerpower.com/api/giveaways');

    // Allow requests from any origin (resolve CORS issue)
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Send the API response back to the client
    res.send(response.data);
  } catch (error) {
    // Handle error
    res.status(500).send(error.message);
  }
});

// Start the proxy server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});

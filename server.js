const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

// Twitter Webhook CRC Challenge
app.get('/webhook/twitter', (req, res) => {
  const crcToken = req.query.crc_token;
  if (!crcToken) {
    return res.status(400).send('Missing crc_token');
  }
  const consumerSecret = process.env.TWITTER_CONSUMER_SECRET || '';
  const hmac = crypto.createHmac('sha256', consumerSecret).update(crcToken).digest('base64');
  res.status(200).json({ response_token: 'sha256=' + hmac });
});

// Twitter Event Listener
app.post('/webhook/twitter', (req, res) => {
  res.status(200).send('Event received');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

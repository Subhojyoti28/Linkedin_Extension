const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { LinkedInProfile } = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/profiles', async (req, res) => {
  try {
    const profile = await LinkedInProfile.create(req.body);
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('API server running at http://localhost:3000');
});

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;
console.log('Loaded API KEY:', API_KEY ? 'YES' : 'NO');

app.post('/api/chat', async (req, res) => {
  const { question } = req.body;

  if (!question) return res.status(400).json({ error: 'Question is required' });

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: question }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const answer = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    res.json({ answer });
  } catch (error) {
    console.error('Error in Gemini API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ data: 'index data' });
});

module.exports = router;

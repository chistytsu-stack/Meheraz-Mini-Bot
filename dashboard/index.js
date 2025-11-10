const express = require('express');
const os = require('os');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('dashboard', { title: 'Meheraz Dashboard' });
});

module.exports = router;

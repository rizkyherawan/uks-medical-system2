const express = require('express');

const router = express.Router();

// Cek cepat apakah server hidup: http://localhost:3000/api/health
router.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

router.use('/patients', require('./patientRoutes'));
router.use('/blood-pressure', require('./bloodPressureRoutes'));

module.exports = router;
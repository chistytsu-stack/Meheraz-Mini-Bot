const express = require('express');
const os = require('os');
const router = express.Router();

function getStats(){
  const uptimeSec = process.uptime();
  const d = Math.floor(uptimeSec / 86400);
  const h = Math.floor((uptimeSec % 86400) / 3600);
  const m = Math.floor((uptimeSec % 3600) / 60);
  const s = Math.floor(uptimeSec % 60);
  const uptime = `${d}d ${h}h ${m}m ${s}s`;
  const memMB = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
  const cpus = os.cpus() || [];
  const cpuModel = cpus[0] ? cpus[0].model : 'Unknown';
  return {
    uptime, memMB, cpuModel, coreCount: cpus.length,
    osType: os.type(), osArch: os.arch(), osRelease: os.release(),
    node: process.version,
    now: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka', hour12: true })
  };
}

router.get('/system', (req, res) => {
  res.json(getStats());
});

module.exports = router;

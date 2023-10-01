const express        = require('express');
const router         = express.Router();
const server       = require('../../utils/server.class');
const { exec } = require('child_process');

router.get('/',async (req, res, next) =>{
    // const serverObj = new server('us-east-1');
    // const listSlaveInstances = await serverObj.listSlaveInstances();
    // res.render('index', {listSlaveInstances});
    exec('hostnamectl', (error, stdout, stderr) => {
        if (error) {
          res.status(500).json({ error: error.message });
          return;
        }
        if (stderr) {
          res.status(500).json({ error: stderr });
          return;
        }
        const lines = stdout.trim().split('\n');
        const hostnameData = {};
        lines.forEach((line) => {
          const [key, value] = line.split(':').map((s) => s.trim());
          hostnameData[key] = value;
        });
        res.json(hostnameData);
    });
});

module.exports = router;

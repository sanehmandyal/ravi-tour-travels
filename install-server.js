const { spawn } = require('child_process');
const path = require('path');

console.log('Starting npm install in server...');
const child = spawn('npm.cmd', ['install', '--no-audit', '--no-fund', '--prefer-offline'], {
  cwd: path.join(__dirname, 'server'),
  shell: true
});

child.stdout.on('data', (data) => {
  process.stdout.write(data);
});

child.stderr.on('data', (data) => {
  process.stderr.write(data);
});

child.on('close', (code) => {
  console.log(`npm install exited with code ${code}`);
});

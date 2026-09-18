const { spawn } = require('child_process');
const path = require('path');

console.log('Starting npm install in client with --legacy-peer-deps...');
const child = spawn('npm.cmd', ['install', '--legacy-peer-deps', '--no-audit', '--no-fund'], {
  cwd: path.join(__dirname, 'client'),
  shell: true
});

child.stdout.on('data', (data) => {
  process.stdout.write(data);
});

child.stderr.on('data', (data) => {
  process.stderr.write(data);
});

child.on('close', (code) => {
  console.log(`npm install in client exited with code ${code}`);
});

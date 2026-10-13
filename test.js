const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const { spawn } = require('node:child_process');

test('Application starts and health endpoint works', async (t) => {
const port = 3100 + Math.floor(Math.random() * 1000);
const serverProcess = spawn(process.execPath, ['app.js'], {
env: { ...process.env, PORT: String(port) },
stdio: 'ignore'
});

t.after(() => serverProcess.kill());

await new Promise((resolve, reject) => {
let attempts = 0;
const check = () => {
http.get(`http://127.0.0.1:${port}/health`, (res) => {
res.resume();
if (res.statusCode === 200) resolve();
else reject(new Error(`Status: ${res.statusCode}`));
}).on('error', () => {
if (++attempts > 30) reject(new Error('App did not start'));
else setTimeout(check, 300);
});
};
check();
});

const result = await new Promise((resolve, reject) => {
http.get(`http://127.0.0.1:${port}/health`, (res) => {
let data = '';
res.on('data', chunk => data += chunk);
res.on('end', () => resolve({ status: res.statusCode, body: data }));
}).on('error', reject);
});

assert.equal(result.status, 200);
assert.equal(JSON.parse(result.body).status, 'healthy');
});

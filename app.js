const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
res.send(`     <!DOCTYPE html>     <html>     <head>       <title>Node.js CI/CD Project</title>       <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          background: #f0f4f8;
          padding: 70px 20px;
        }
        .card {
          background: white;
          padding: 35px;
          border-radius: 15px;
          max-width: 550px;
          margin: auto;
          box-shadow: 0 4px 15px #ccc;
        }
        h1 { color: #2563eb; }
        .success { color: #15803d; font-weight: bold; }
        a { color: #2563eb; }       </style>     </head>     <body>       <div class="card">         <h1>🚀 Node.js CI/CD Project</h1>         <h2 class="success">Application deployed successfully!</h2>         <p>Welcome to my automated deployment project.</p>         <p>Status: <b>Running</b> ✅</p>         <p>Environment: <b>Production</b></p>         <p><a href="/health">Check Application Health</a></p>       </div>     </body>     </html>
  `);
});

app.get('/health', (req, res) => {
res.status(200).json({
status: 'healthy',
application: 'Node.js CI/CD Project'
});
});

app.listen(PORT, '0.0.0.0', () => {
console.log(`App running on port ${PORT}`);
});

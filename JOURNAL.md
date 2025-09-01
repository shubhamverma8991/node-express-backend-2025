- Initialize npm : 
npm init -y

- Install Express :
npm install express

- Basic Express App
// index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Backend!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

- Run Server
node index.js

-  More Endpoints
app.get('/status', (req, res) => {
  res.json({ ok: true, backend: true });
});

app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

- Install Nodemon for Auto - Restart
npm install --save-dev nodemon

"scripts": {
  "dev": "nodemon index.js"
}

npm run dev

- First Middleware (Logger)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

- 404 Handler and Error Middleware
// 404 Handler
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});


- POST Request
// * Post Request ( without validation )
app.post("/add", (req, res) => {
  //    req body will contain the parsed JSON sent by the client
  res.json({
    received: req.body,
    message: "Data added successfully",
  });
});

url - http://localhost:3000/add
body - { "message": "Hello, API!", "number": 42 }


- POST Request ( with Validation )
app.post('/echo', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required!" });
  }
  res.json({ received: message });
});

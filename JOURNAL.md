<!-- ! Day 1 -->

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


<!-- ! Day 2 -->

- Added Middleware to Parse the JSON 
// *Middleware to parse JSON request bodies
app.use(express.json());


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


<!-- ! Day 3 -->
Great! Day 3 will expand your backend skills by introducing you to variables/configuration (using .env), validating input in a more robust way, and exploring how to organize your routes/controllers as your app grows.

- Install dotenv
npm install dotenv

- in a project folder , create a file called  " .env "
example for (.env)
PORT=4000
CUSTOM_MESSAGE=WelcomeToBackend

- use dotenv in your index.js
require('dotenv').config();

- to use your variable 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


- Add Input Validation with zod
- Install zod
npm install zod

- At the TOP of index.js add
const { z } = require('zod');

// * Post Request (With Validation using zod)
app.post("/echo",(req,res)=>{
    const schema=z.object({
        message:z.string().min(1, "Message is required"),
        number:z.number().optional(),
    })
    const parsedData=schema.safeParse(req.body);
    if(!parsedData.success){
        return res.status(400).json({ error: parsedData.error.issues });
    }

    res.json({received:parsedData.data})
})

- Basic Project Structure as Your App Grows
backend-journey/
  routes/
    echo.js
  controllers/
    echoController.js
  index.js




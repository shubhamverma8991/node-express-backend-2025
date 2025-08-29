const express = require('express');
const app = express();

// *First Middleware (Logger) Log the request method and url
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// *Routes
app.get('/', (req, res) => {
    res.send('Hello Shubham');
});

app.get('/about', (req, res) => {   
    res.json({
        name: 'Shubham',
        age: 29,
        city: 'Bhilai'
    });
});

app.get('/contact/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}`);
});

// *Port Number
app.listen(3000, () => {
    console.log('We have Started our server on port 3000');
});


// *404 Handler and Error Handler

// *404 Handler
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

// *Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
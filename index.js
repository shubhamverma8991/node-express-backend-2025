const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Shubham');
});

app.listen(3000, () => {
    console.log('We have Started our server on port 3000');
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

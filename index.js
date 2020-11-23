const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

app.get('/', (req, res) => {
    const user = {
        id: 1,
        name: 'Hakim'
    };

    res.send(user);
});

app.post('/api/login', (req, res) => {
    console.log(req.body);
    if (!req.body.user || !req.body.password)
        res.status(400).send('Bad request');
    
    const token = jwt.sign(req.body, 'app-secret');
    return res.send(token);
});

app.get('/api/staff', verifyToken, (req, res) => {
    const staff = [
        { id: 1, name: 'Hakim', job: 'Programmer' },
        { id: 2, name: 'Faiz', job: 'Business Man' },
        { id: 3, name: 'Aman', job: 'Engineer' }
    ];

    res.send(staff);
});

function verifyToken(req, res, next) {
    const tokenString = req.headers['x-auth-token'];
    
    if (!tokenString) return res.status(400).send('No token provided');

    const token = tokenString.split(" ")[1]; // get string after 'Bearer '
    
    jwt.verify(token, 'app-secret', (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        
        next();
    });
}

app.listen(3000, () => console.log('listening on port 3000'));
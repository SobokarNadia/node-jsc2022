const fs = require('node:fs');
const express = require('express');

const app = express();

const PORT = 5000;

app.listen(PORT, () => console.log(`Server has started at the port ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/users', (req, res) => {
    fs.readFile('./users.json', {encoding: 'utf-8'}, (err, data) => {
        console.log(err);
        res.json(JSON.parse(data))
    })
});

app.get('/users/:userId', (req, res) => {
    let {userId} = req.params;

    fs.readFile('./users.json', {encoding: 'utf-8'}, (err, data) => {
        console.log(err);

        const user = JSON.parse(data)[+userId];
        if (user) {
            res.json(user)
        }else{
            res.send('User doest exist!')
        }
    })
});

app.post('/users', (req, res) => {
    const body = req.body;

    if(body.name.length> 2 && body.age>0 && (body.gender === 'male' || body.gender === 'female')){
        fs.readFile('./users.json',  (err, data) => {
            console.log(err);

            const users = JSON.parse(data);
            users.push(body);
            fs.writeFile('./users.json', JSON.stringify(users) , 'utf8' ,err => console.log(err));
            res.json(body);
        })
    }else {
        res.status(400);
    }
});

app.delete('/users/:userId', (req, res) => {
    let {userId} = req.params;

    fs.readFile('./users.json', {encoding: 'utf-8'}, (err, data) => {
        console.log(err);

        const users = JSON.parse(data);
        if (users[+userId]) {
            users.splice(+userId, 1);
            fs.writeFile('./users.json', JSON.stringify(users) , 'utf8' ,err => console.log(err));
            res.send('Successfully deleted')
        }else{
            res.send('User doest exist!')
        }
    })
});

app.put('/users/:userId', (req, res) => {
    const {userId} = req.params;
    const body = req.body;

    fs.readFile('./users.json', {encoding: 'utf-8'}, (err, data) => {
        console.log(err);

        const users = JSON.parse(data);

        if (users[+userId]) {
            users[+userId] = body;
            fs.writeFile('./users.json', JSON.stringify(users) , 'utf8' ,err => console.log(err));
            res.json(body);
        }else{
            res.send('User doest exist!')
        }
    })
});

app.patch('/users/:userId', (req, res) => {
    const {userId} = req.params;
    const body = req.body;

    fs.readFile('./users.json', {encoding: 'utf-8'}, (err, data) => {
        console.log(err);

        const users = JSON.parse(data);
        const user = users[+userId];

        if (user) {
            for (const key in user) {
                if (user[key] !== body[key]){
                    user[key] = body[key];
                }
            }
            fs.writeFile('./users.json', JSON.stringify(users) , 'utf8' ,err => console.log(err));
            res.json(body);
        }else{
            res.send('User doest exist!')
        }
    })
});






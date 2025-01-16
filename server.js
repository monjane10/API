import express from 'express'

const app = express();
app.use(express.json());

const users = [];

app.post('/utilizadores', (req, res) => {
    users.push(req.body);
    console.log(req.body);
    res.send('Utilizador criado');
})

app.get('/utilizadores', (req, res) => {
  res.json(users);
});

app.listen(3000, () => {  
});
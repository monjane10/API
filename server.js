import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.post('/utilizadores', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      },
    });

    // Adicionar o usuário na lista (se necessário)
    res.status(201).send('Utilizador criado com sucesso!');
  } catch (error) {
    // Tratar o erro e enviar uma única resposta
    console.error('Erro ao criar o utilizador:', error.message);
    res.status(500).send('Erro ao criar o utilizador');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
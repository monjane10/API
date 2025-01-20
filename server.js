/***
 * API
 * Author: Lourenço Monjane
 */
import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

//Função para criar utilizador
app.post('/utilizadores', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      },
    });

    res.status(201).send('Utilizador criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar o utilizador:', error.message);
    res.status(500).send('Erro ao criar o utilizador');
  }
});

//Função para listar utilizadores
app.get('/utilizadores', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar os utilizadores:', error.message);
    res.status(500).send('Erro ao buscar os utilizadores');
  }
})

app.get('/usuarios', async (req, res) => {
  try {
    let users = []
   if(req.query){
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        age: req.query.age
      }
    });

   } else{
    console.log("Utilizador não encontrado");
   }
  } catch (error) {
    console.error('Erro ao buscar os utilizadores:', error.message);
    res.status(500).send('Erro ao buscar os utilizadores');
  }
})

// Função para actualizar utilizador
app.put('/utilizadores/:id', async (req, res) => {
    try {
      const user = await prisma.user.update({
        where: { id: req.params.id },
        data: {
          email: req.body.email,
          name: req.body.name,
          age: req.body.age,
        },
      });

      res.status(201).send('Utilizador actualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao actualizar o utilizador:', error.message);
      res.status(500).send('Erro ao actualizar o utilizador');
    }
  });

  app.delete('/utilizadores/:id', async (req, res) => {
    try{
      await prisma.user.delete ({
        where:{ id: req.params.id }
      });
      res.status(200).send("Utilizador foi apagado com sucesso!");


    } catch(error) {
      console.error('Erro ao apagar o utilizador', error.message);

    }

  });


  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
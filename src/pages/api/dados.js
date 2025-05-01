require('dotenv').config();  
import mysql from 'mysql2/promise';  // Use a versão 'promise' para usar await  

export default async function handler(req, res) {  
  // Crie o pool de conexões ou conexão na própria função  
  const connection = await mysql.createConnection(process.env.DB_URL);  

  if (req.method === 'POST') {  
    const { email, senha } = req.body;  

    const query = 'INSERT INTO users (email, senha) VALUES (?, ?)';  
    try {  
      await connection.execute(query, [email, senha]);  
      res.status(201).send('Dados salvos com sucesso!');  
    } catch (error) {  
      console.error('Erro ao inserir dados: ', error);  
      res.status(500).send('Erro ao salvar os dados');  
    } finally {  
      await connection.end(); // Fecha conexão após o uso  
    }  
  } else {  
    res.setHeader('Allow', ['POST']);  
    res.status(405).end(`Method ${req.method} Not Allowed`);  
  }  
}  
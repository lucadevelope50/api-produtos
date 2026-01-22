const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

/* ✅ CORS LIBERADO PARA QUALQUER ORIGEM */
app.use(cors());

/* ✅ LEITURA DE JSON */
app.use(express.json());

const FILE = './produtos.json';

/* 🔹 GARANTE QUE O ARQUIVO EXISTE */
function lerDados() {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(
      FILE,
      JSON.stringify({ perdidos: [], achados: [] }, null, 2)
    );
  }
  return JSON.parse(fs.readFileSync(FILE));
}

/* 🔹 BUSCAR DADOS */
app.get('/dados', (req, res) => {
  res.json(lerDados());
});

/* 🔹 SALVAR DADOS */
app.post('/dados', (req, res) => {
  fs.writeFileSync(FILE, JSON.stringify(req.body, null, 2));
  res.json({ ok: true });
});

/* 🔹 INICIAR SERVIDOR */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta', PORT);
});

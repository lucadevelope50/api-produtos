const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const FILE = './produtos.json';

function lerDados() {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify({ perdidos: [], achados: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(FILE));
}

app.get('/dados', (req, res) => {
  res.json(lerDados());
});

app.post('/dados', (req, res) => {
  fs.writeFileSync(FILE, JSON.stringify(req.body, null, 2));
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Rodando na porta', PORT));

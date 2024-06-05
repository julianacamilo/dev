const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const IP_PUBLICO = '54.152.50.161'; // Substitua pelo endereço IPv4 público da sua instância AWS

app.use(bodyParser.json());
app.use(cors());

let users = [];

// Carregar usuários do arquivo JSON ao iniciar o servidor
fs.readFile('users.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading users file:', err);
  } else {
    users = JSON.parse(data);
  }
});

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (users.some(user => user.username === username)) {
    res.json({ success: false, message: 'Username already exists' });
  } else {
    users.push({ username, password });
    saveUsersToFile();
    res.json({ success: true });
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

// Salvar usuários no arquivo JSON
function saveUsersToFile() {
  fs.writeFile('users.json', JSON.stringify(users), 'utf8', (err) => {
    if (err) {
      console.error('Error writing users file:', err);
    }
  });
}

// Defina a porta para a qual o servidor irá ouvir
const PORT = 3000; // Substitua pela porta desejada
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

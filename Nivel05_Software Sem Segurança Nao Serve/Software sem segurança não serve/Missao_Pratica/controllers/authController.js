const crypto = require('crypto');
const users = require('../mockData/users'); // Mock de dados de usuários

const secretKey = 'nomedaempresa'; // Chave secreta usada para criptografar e descriptografar a session-id

// Função para login
exports.login = (req, res) => {
  const credentials = req.body;
  let userData = doLogin(credentials);

  if (userData) {
    const dataToEncrypt = `{"usuario_id":${userData.id}}`;
    const bufferToEncrypt = Buffer.from(dataToEncrypt, 'utf8');
    const hashString = encrypt(bufferToEncrypt);
    res.json({ sessionid: hashString });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
};

// Função para descriptografar a session-id
exports.decrypt = (req, res) => {
  const sessionid = req.params.sessionid;
  const decryptedSessionid = decrypt(sessionid);
  res.json({ decryptedSessionid });
};

// Função de criptografia
function encrypt(text) {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Função de descriptografia
function decrypt(encryptedText) {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Função para realizar login
function doLogin(credentials) {
  return users.find(item => {
    return credentials?.username === item.username && credentials?.password === item.password;
  });
}

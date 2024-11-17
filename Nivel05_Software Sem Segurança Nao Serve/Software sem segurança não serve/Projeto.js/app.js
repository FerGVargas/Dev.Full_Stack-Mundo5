const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

// Chave secreta usada para assinar e verificar os tokens
const secretKey = 'sua_chave_secreta';

app.use(express.json());

// Rota para login e geração do token
app.post('/login', (req, res) => {
    const user = { id: 123 };  // Em uma aplicação real, você validaria o usuário aqui
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
    res.json({ token });
});

// Rota protegida, que exige o token
app.get('/confidential-data', (req, res) => {
    // Recuperando o token do cabeçalho 'Authorization'
    const token = req.headers['authorization']?.split(' ')[1]; // 'Bearer token'

    if (!token) {
        return res.status(401).json({ message: 'Acesso não autorizado. Token de autenticação ausente.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Acesso não autorizado. Token inválido ou expirado.' });
        }

        // Se o token for válido, responde com os dados confidenciais
        res.json({
            userId: decoded.id,
            data: 'Dados confidenciais acessados com sucesso!',
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

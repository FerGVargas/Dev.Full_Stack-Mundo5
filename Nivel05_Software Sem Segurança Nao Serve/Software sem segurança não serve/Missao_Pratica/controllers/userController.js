const users = require('../mockData/users'); // Mock de dados de usuários

// Função para recuperar todos os usuários
exports.getUsers = (req, res) => {
  const sessionid = req.params.sessionid;
  const perfil = getPerfil(sessionid);

  if (perfil !== 'admin') {
    res.status(403).json({ message: 'Forbidden' });
  } else {
    res.status(200).json({ data: users });
  }
};

// Função para recuperar o perfil a partir da session-id
function getPerfil(sessionId) {
  try {
    const user = JSON.parse(decrypt(sessionId));
    const userData = users.find(item => parseInt(user.usuario_id) === parseInt(item.id));
    return userData ? userData.perfil : 'undefined';
  } catch (error) {
    console.error('Erro ao descriptografar session-id:', error);
    return 'undefined';
  }
}

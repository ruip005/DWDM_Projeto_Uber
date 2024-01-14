const bcrypt = require('bcryptjs');

module.exports = (uncrypted) => {
    // Criptografa a senha
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(uncrypted, salt);
    return hash;
}
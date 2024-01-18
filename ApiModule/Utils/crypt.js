const bcrypt = require("bcryptjs");

const encrypt = (uncrypted) => {
  // Criptografa a senha
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(uncrypted, salt);
  return hash;
};

const compare = (uncrypted, hash) => {
  // Compara a senha com a senha criptografada
  return bcrypt.compareSync(uncrypted, hash);
};

module.exports = {
  encrypt,
  compare,
};

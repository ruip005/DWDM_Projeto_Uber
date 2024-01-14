const { default: axios } = require('axios');
const apiKeyModel = require('../Models/apiKey');
const appAdminModel = require('../Models/appAdmin');

// Middleware para autenticação por chave de API
const authenticate = async (req, res, next) => { // Usar futuramente em terceiros
    const apiKey = req.header('x-api-key');
  
    if (!apiKey) {
      return res.status(401).json({ success: false, message: 'Chave de API não fornecida' });
    }
  
    try {
        const apiKeyRecord = await apiKeyModel.findOne({ key: apiKey });

        if (!apiKeyRecord) {
          return res.status(401).json({ success: false, message: 'Chave de API inválida' });
        }
  
        next();
      } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro ao autenticar a chave de API' });
      }
};

// Middleware para log de requisições
const logging = (req, res, next) => {
    console.log(`Requisição: ${req.method} ${req.url} [ ${req.ip} ] - ${new Date()}`);
    next();
  };

  // Middleware para verificar o token
  const checkToken = (req, res, next) => {
    const authHead = req.headers['authorization'];
    const token = authHead && authHead.split(' ')[1];

    if (token == null) return res.status(401).json({ success: false, message: 'Acesso negado' });

    try {
      const secret = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(403).json({ success: false, message: 'Acesso negado' });
    }

  }

// Middleware para antivpn
const antiVPN = (req, res, next) => {
    const ip = req.ip;

    /*if (ip == '::1' || ip == null) {
      return res.status(401).json({ success: false, message: 'Acesso negado' });
    }*/ // Descomentar para testar localmente -- TO DO 
    
    const url = `https://ipqualityscore.com/api/json/ip/${process.env.API}/${ip}`
    axios.get(url)
    .then(function (response) {
      if (response.data.fraud_score >= 93 || response.data.vpn == true) {
        return res.status(305).json({ success: false, message: 'Acesso negado' });
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    next();
  };

const isAPIAlreadyUsed = (key) => { // Não é middleware, é uma função para verificar se a API já existe
    return new Promise((resolve, reject) => {
      apiKeyModel.findOne({ key })
        .then((result) => {
          if (result) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
    /*
    const isAPIAlreadyUsed = async (key) => {
  try {
    const result = await apiKeyModel.findOne({ key: key });
    return !!result; //  !!result converte o resultado em um booleano: se result existir, !!result será true; caso contrário, será false.
  } catch (err) {
    throw err;
  }
};
    */
}

const isAdmin = (userId) => { // Não é middleware, é uma função para verificar se o utilizador é admin
  return new Promise((resolve, reject) => {
    appAdminModel.findOne({ userId })
      .then((result) => {
        if (result) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

  module.exports = {
    authenticate,
    logging,
    antiVPN,
    isAPIAlreadyUsed,
    isAdmin,
    checkToken
  };

/*
{
  success: true,
  message: 'Success',
  fraud_score: 38,
  country_code: 'N/A',
  region: 'N/A',
  city: '',
  ISP: 'N/A',
  ASN: 0,
  organization: 'N/A',
  is_crawler: false,
  timezone: '',
  mobile: false,
  host: 'localhost',
  proxy: false,
  vpn: false,
  tor: false,
  active_vpn: false,
  active_tor: false,
  recent_abuse: false,
  bot_status: false,
  connection_type: 'Premium required.',
  abuse_velocity: 'Premium required.',
  zip_code: 'N/A',
  latitude: 0,
  longitude: 0,
  request_id: 'JwbrOCBYHo'
}
*/
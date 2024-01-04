const { default: axios } = require('axios');
const apiKeyModel = require('./Models/apikey');

// Middleware para autenticação por chave de API
const authenticate = async (req, res, next) => {
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
const middlewareLogging = (req, res, next) => {
    console.log(`Requisição: ${req.method} ${req.url} [ ${req.ip} ] - ${new Date()}`);
    next();
  };

// Middleware para antivpn
const antiVPN = (req, res, next) => {
    const ip = req.ip;

    /*if (ip == '::1' || ip == null) {
      return res.status(401).json({ success: false, message: 'Acesso negado' });
    }*/ // Descomentar para testar localmente -- TO DO 
    
    const url = `https://ipqualityscore.com/api/json/ip/${process.env.API}/${ip}`
    axios.get(url)
    .then(function (response) {
      if (response.data.fraud_score >= 85 || response.data.vpn == true) {
        return res.status(305).json({ success: false, message: 'Acesso negado' });
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    next();
  };

  module.exports = {
    authenticate,
    middlewareLogging,
    antiVPN
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
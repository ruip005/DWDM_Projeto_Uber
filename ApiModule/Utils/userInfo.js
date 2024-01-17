const axios = require("axios");

module.exports = (ipv4) => {
  ipv4 == "::1" ? (ipv4 = process.env.OFFICE_IP) : (ipv4 = ipv4);
  const url = `https://apiip.net/api/check?ip=${ipv4}&accessKey=${process.env.API2}`;
  return axios
    .get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
};

module.exports = (ipv4) => {
  const url = " https://api.country.is";
  axios
    .get(url)
    .then(function (response) {
      return response.json().country;
    })
    .catch(function (error) {
      console.log(error);
      return "N/A";
    });
};

const Restaurant = ({ id }) => {
  // props especificos de cada restaurante
  const url = "localhost:3000/users/restaurants/" + id;
  const data = fetch(url)
    .then((response) => console.log(response.json()))
    .catch((error) => console.log(error));
  return <div>Restaurante: {response.json().name}</div>;
  // To do - continuar
};

export default Restaurant;

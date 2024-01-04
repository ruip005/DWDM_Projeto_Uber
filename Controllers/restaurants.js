const Restaurant = require('../Models/restaurant');

// Controller para restaurantes
const restaurantController = {
  // Listar todos os restaurantes
  getAllRestaurants: async (req, res) => {
    try {
      const restaurantes = await Restaurant.find({});
      res.json(restaurantes);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao obter os restaurantes.",
      });
    }
  },

  // Criar um novo restaurante
  createRestaurant: async (req, res) => {
    const { nome, endereco, /* outras informações */ } = req.body;
    const novoRestaurante = new Restaurant({ nome, endereco /* outras informações */ });

    try {
      const restauranteSalvo = await novoRestaurante.save();
      res.status(201).json(restauranteSalvo);
    } catch (err) {
      res.status(400).send({
        message: err.message || "Ocorreu um erro ao criar o restaurante.",
      });
    }
  },

  // Outras operações com restaurantes podem ser adicionadas aqui conforme necessário
};

module.exports = restaurantController;

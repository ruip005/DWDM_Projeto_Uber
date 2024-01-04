const Restaurant = require('../Models/restaurant');
const FileContainer = require('../Models/fileContainer');
const Box = require('../Models/box')

// Controller para restaurantes
const restaurantController = {
  // Listar todos os restaurantes
  getAllRestaurants: async (req, res) => { // Obter todos os restaurantes
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
    const { // Dados do restaurante a receber
      campanyName, 
      deliveryFee, 
      businessHours, 
      contactEmail, 
      contactPhone, 
      deliversToHome, 
      Address  
    } = req.body;

    if (!campanyName || !deliveryFee || !businessHours || !contactEmail || !contactPhone || !deliversToHome || !Address) { // Verificar se todos os dados foram recebidos
      return res.status(400).json({
        success: false,
        message: "Todos os campos são obrigatórios!",
      });
    }

    let BoxID, ContainerID; // IDs que serão gerados
    let novoRestaurante = new Restaurant({ // Criar novo restaurante com os dados recebidos
      campanyName, 
      deliveryFee, 
      businessHours, 
      contactEmail, 
      contactPhone, 
      deliversToHome, 
      BoxID, 
      ContainerID, 
      Address 
    });

    const novoContainer = new FileContainer(); // Criar o container com data de criação atual
    const novoBox = new Box(); // Criar a box com data de criação atual

    try { // Tentar guardar o restaurante, o container e a box

      const containerSalvo = await novoContainer.save(); 
      const boxSalvo = await novoBox.save();
      BoxID = boxSalvo._id;
      ContainerID = containerSalvo._id;
      const restauranteSalvo = await novoRestaurante.save();

      res.status(201).json({
        success: true, 
        message: "Restaurante criado com sucesso!"
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Ocorreu um erro ao criar o restaurante.",
      });
    }
  },


};

module.exports = restaurantController;

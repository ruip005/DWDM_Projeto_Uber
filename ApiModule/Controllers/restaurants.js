const Restaurant = require("../Models/restaurant");
const Box = require("../Models/box");
const restaurantAdmin = require("../Models/restaurantsAdmins");
const user = require("../Models/user");
const { createLog } = require("../Utils/Logs");
const { isAdmin } = require("../Utils/middleware");
const { createImage } = require("./images");

const restaurantController = {
  // Listar todos os restaurantes
  getAllRestaurants: async (req, res) => {
    // Obter todos os restaurantes
    try {
      const restaurantes = await Restaurant.find({});
      res.send({
        success: true,
        restaurantes,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Ocorreu um erro ao obter os restaurantes.",
      });
    }
  },

  getFilteredRestaurants: async (req, res) => {
    try {
      let query = {};

      // Verifica se foi fornecido um parâmetro de pesquisa (por exemplo, 'nome')
      if (req.query.campanyName) {
        // Utiliza uma expressão regular para buscar parcialmente o nome
        query = {
          campanyName: { $regex: new RegExp(req.query.campanyName, "i") },
        };
      }

      const restaurantes = await Restaurant.find(query);
      res.send({
        success: true,
        restaurantes,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Ocorreu um erro ao obter os restaurantes.",
      });
    }
  },

  // Criar um novo restaurante
  createRestaurant: async (req, res) => {
    const {
      campanyName,
      deliveryFee,
      businessHours,
      contactEmail,
      contactPhone,
      deliversToHome,
      Address,
      userId,
      staffId,
      img,
      type,
    } = req.body;

    console.log(req.body);

    if (
      !userId ||
      !campanyName ||
      !businessHours ||
      !deliveryFee ||
      !contactEmail ||
      !contactPhone ||
      !Address ||
      !staffId ||
      !type
    ) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos são obrigatórios!",
      });
    }

    if (!img) {
      return res.status(400).json({
        success: false,
        message: "Imagem não recebida ou inválida!",
      });
    }

    try {

      let BoxID;
      let novoRestaurante = new Restaurant({
        campanyName,
        deliveryFee,
        businessHours,
        contactEmail,
        contactPhone,
        deliversToHome,
        BoxID,
        Address,
        type: type,
      });

      if (!(await isAdmin(userId))) {
        return res.status(401).json({
          success: false,
          userId,
          message: "Acesso negado!", 
        });
      }


      const novoBox = new Box();
      const boxSalvo = await novoBox.save();

      BoxID = boxSalvo._id;

      const restauranteSalvo = await novoRestaurante.save();

      const newImage = await createImage(restauranteSalvo._id, img);

      await Restaurant.findByIdAndUpdate(
        restauranteSalvo._id,
        { BoxID},
        { new: true }
      );

      await restaurantAdmin.create({
        campanyId: restauranteSalvo._id,
        userId: staffId,
      });

      await createLog(
        "create",
        `Restaurante ${campanyName} criado com sucesso!`,
        userId,
        restauranteSalvo._id,
        true
      );

      res.status(201).json({
        success: true,
        message: "Restaurante criado com sucesso!",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || "Ocorreu um erro ao criar o restaurante.",
      });
    }
  },

  // Obter um restaurante por ID
  getRestaurantById: async (req, res) => {
    const id = req.params.id; // Obter ID do restaurante a obter

    try {
      const restaurante = await Restaurant.findById(id); // Obter restaurante por ID

      if (!restaurante) {
        // Verificar se o restaurante existe
        return res.status(404).json({
          success: false,
          message: "Restaurante não encontrado!",
        });
      }

      res.json({
        success: true,
        restaurante,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao obter o restaurante.",
      });
    }
  },

  // Atualizar um restaurante por ID
  updateRestaurantById: async (req, res) => {
    const { id } = req.params;
    console.log("Update Request Body:", req.body);
  
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID do restaurante não recebido!",
      });
    }
  
    const {
      
      campanyName,
      deliveryFee,
      businessHours,
      contactEmail,
      contactPhone,
      deliversToHome,
      Address,
      type,
    } = req.body;
  
    if (
      !campanyName ||
      !deliveryFee ||
      !businessHours ||
      !contactEmail ||
      !contactPhone ||
      !deliversToHome ||
      !Address ||
      !type
    ) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos são obrigatórios!",
      });
    }
  
    try {
      // Check if the restaurant with the provided ID exists
      const existingRestaurant = await Restaurant.findById(id);

      console.log("Existing Restaurant:", existingRestaurant);

      if (!existingRestaurant) {
        return res.status(404).json({
          success: false,
          message: "Restaurante não encontrado!",
        });
      }
  
      // Update the restaurant data
      const restaurante = await Restaurant.findByIdAndUpdate(
        id,
        {
          campanyName,
          deliveryFee,
          businessHours,
          contactEmail,
          contactPhone,
          deliversToHome,
          Address,
          type,
        },
        { new: true }
      );
  
      await createLog(
        "update",
        `Restaurante ${campanyName} atualizado com sucesso!`,
        req.user._id,
        restaurante._id,
        true
      );
  
      res.json({
        success: true,
        message: "Restaurante atualizado com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message:
          err.message || "Ocorreu um erro ao atualizar o restaurante.",
      });
    }
  },

  // Apagar um restaurante por ID
  deleteRestaurantById: async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID do restaurante não recebido!",
      });
    }

    try {
      if ((await isAdmin(userId)) == false) {
        return res.status(401).json({
          success: false,
          message: "Acesso negado!",
        });
      }

      const restaurante = await Restaurant.findByIdAndDelete(id);

      if (!restaurante) {
        return res.status(404).json({
          success: false,
          message: "Restaurante não encontrado!",
        });
      }

      await createLog(
        "delete",
        `Restaurante ${restaurante.campanyName} apagado com sucesso!`,
        req.user._id,
        restaurante._id,
        true
      );

      res.json({
        success: true,
        message: "Restaurante apagado com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao apagar o restaurante.",
      });
    }
  },

  // Obter todas os produtos de um restaurante
  getRestaurantBoxes: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID do restaurante não recebido!",
      });
    }

    try {
      const restaurante = await Restaurant.findById(id);

      if (!restaurante) {
        return res.status(404).json({
          success: false,
          message: "Restaurante não encontrado!",
        });
      }

      const boxes = await Box.find({ RestaurantID: id });

      res.json({
        success: true,
        boxes,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message:
          err.message || "Ocorreu um erro ao obter as boxes do restaurante.",
      });
    }
  },

  // Adicionar admins ao restaurante
  addAdminsToRestaurant: async (req, res) => {
    const { id } = req.params;
    const { admins } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID do restaurante não recebido!",
      });
    }

    if (!admins) {
      return res.status(400).json({
        success: false,
        message: "IDs dos admins não recebidos!",
      });
    }

    try {
      const restaurante = await Restaurant.findById(id);

      if (!restaurante) {
        return res.status(404).json({
          success: false,
          message: "Restaurante não encontrado!",
        });
      }

      admins.forEach(async (admin) => {
        const adminExiste = await user.findById(admin);

        if (!adminExiste) {
          return res.status(404).json({
            success: false,
            message: "User não encontrado!",
          });
        }

        const novoAdmin = new restaurantAdmin({
          campanyId: id,
          userId: admin,
        });

        await novoAdmin.save();
        await createLog(
          "create",
          `Admin ${adminExiste.name} adicionado ao restaurante ${restaurante.campanyName}!`,
          req.user._id,
          restaurante._id,
          true
        );
      });

      res.json({
        success: true,
        message: "Admins adicionados com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao adicionar os admins.",
      });
    }
  },

  // Obter todos os admins de um restaurante
  getRestaurantAdmins: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID do restaurante não recebido!",
      });
    }

    try {
      const restaurante = await Restaurant.findById(id);

      if (!restaurante) {
        return res.status(404).json({
          success: false,
          message: "Restaurante não encontrado!",
        });
      }

      const admins = await restaurantAdmin.find({ campanyId: id });

      res.json({
        success: true,
        admins,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao obter os admins.",
      });
    }
  },

  // Apagar um admin de um restaurante
  deleteRestaurantAdmin: async (req, res) => {
    const { id, adminId } = req.params;

    if (!id || !adminId) {
      return res.status(400).json({
        success: false,
        message: "ID do restaurante ou do admin não recebido!",
      });
    }

    try {
      const restaurante = await Restaurant.findById(id); // TO DO APAGAR DEPENDENCIAS TIPO FOTOS

      if (!restaurante) {
        return res.status(404).json({
          success: false,
          message: "Restaurante não encontrado!",
        });
      }

      const admin = await restaurantAdmin.findOneAndDelete({
        campanyId: id,
        userId: adminId,
      });

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin não encontrado!",
        });
      }

      await createLog(
        "delete",
        `Admin ${adminId} apagado do restaurante ${restaurante.campanyName}!`,
        req.user._id,
        restaurante._id,
        true
      );

      res.json({
        success: true,
        message: "Admin apagado com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao apagar o admin.",
      });
    }
  },
};

module.exports = restaurantController;

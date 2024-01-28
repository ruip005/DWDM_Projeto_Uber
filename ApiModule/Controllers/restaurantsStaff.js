const item = require("../Models/item");
const restaurant = require("../Models/restaurant");
const staff = require("../Models/restaurantsAdmins");
const ingredient = require("../Models/ingredients");
const { createImage} = require("../Controllers/images");
const restaurantStaffController = {
  

  createNewProduct: async (req, res) => {
    const {
      id,
      name,
      description,
      price,
      userId,
      quantity,
      data, // todo - image
    } = req.body;

    const createLog = async (action, description, userId, entityId, success) => {
      console.log(`Action: ${action}, Description: ${description}, User ID: ${userId}, Entity ID: ${entityId}, Success: ${success}`);
    };

    console.log(req.body);
    console.log(req.params);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID do restaurante não recebido!",
      });
    }

    if (!name || !description || !price || !userId) {
      return res.status(400).json({
        success: false,
        message: "Dados em falta!",
      });
    }

    try {
      const getRestaurant = await restaurant.find({ _id: id });
      const restaurantId = getRestaurant[0]._id; 
            
      if (!getRestaurant) {
        return res.status(400).json({
          success: false,
          message: "Restaurante não encontrado!",
        });
      }

      const getRestaurantStaff = await staff.find({ userId });

      if (!getRestaurantStaff) {
        return res.status(401).json({
          success: false,
          message:
            "Você não tem permissões para criar produtos neste restaurante!",
        });
      }

      const newItem = new item({
        itemName: name,
        itemDescription: description,
        itemPrice: price,
        restaurantId: restaurantId,
        quantity: 1,
      });

      await newItem.save();

      await createImage(newItem._id, data);

      await createLog(
        "createNewProduct",
        `O utilizador ${userId} criou o produto ${name} no restaurante ${id}.`,
        userId,
        id,
        true
      );

      res.json({
        success: true,
        message: "Produto criado com sucesso!",
        newItem,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao criar o produto.",
      });
    }
  },
  getProductById: async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "ID do produto não recebido!",
      });
    }

    try {
      const product = await item.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Produto não encontrado!",
        });
      }

      res.json({
        success: true,
        message: "Produto encontrado com sucesso!",
        product,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao encontrar o produto.",
      });
    }
  },

    getProducts: async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID do restaurante não recebido!",
      });
    }
    try {
  
      const products = await item.find({ restaurantId: id });
  
      res.json({
        success: true,
        message: "Produtos encontrados com sucesso!",
        products,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao encontrar os produtos.",
      });
    }
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { name, description, price, userId } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID do produto não recebido!",
      });
    }

    if (!name || !description || !price || !userId) {
      return res.status(400).json({
        success: false,
        message: "Dados em falta!",
      });
    }

    try {
      const getProduct = await item.find({ _id: id });

      if (!getProduct) {
        return res.status(400).json({
          success: false,
          message: "Produto não encontrado!",
        });
      }

      const getRestaurantStaff = await staff.find({ userId });

      const getRestaurantInfo = await getRestaurantStaff[0].restaurantId;

      const getRestaurant = await restaurant.find({ _id: getRestaurantInfo });

      if (!getRestaurantStaff) {
        return res.status(401).json({
          success: false,
          message:
            "Você não tem permissões para editar produtos neste restaurante!",
        });
      }

      const updateProduct = await item.updateOne(
        { _id: id },
        {
          name,
          description,
          price,
        }
      );


      await createLog(
        "updateProduct",
        `O utilizador ${userId} editou o produto ${name} no restaurante ${getProduct[0].restaurantId}.`,
        userId,
        id,
        true
      );

      res.json({
        success: true,
        message: "Produto editado com sucesso!",
        updateProduct,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao editar o produto.",
      });
    }
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID do produto não recebido!",
      });
    }

    try {
      const getProduct = await item.find({ _id: id });

      if (!getProduct) {
        return res.status(400).json({
          success: false,
          message: "Produto não encontrado!",
        });
      }


      const deleteProduct = await item.deleteOne({ _id: id });


      res.json({
        success: true,
        message: "Produto apagado com sucesso!",
        deleteProduct,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao apagar o produto.",
      });
    }
  },

  updateRestaurant: async (req, res) => {
    const { id } = req.params;
    const {
      userId,
      deliveryFee,
      businessHours,
      deliversToHome,
      Address,
      contactPhone,
    } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID do restaurante não recebido!",
      });
    }

    if (
      !deliveryFee ||
      !businessHours ||
      !deliversToHome ||
      !Address ||
      !contactPhone
    ) {
      return res.status(400).json({
        success: false,
        message: "Dados em falta!",
      });
    }

    try {
      const getRestaurant = await restaurant.find({ _id: id });

      if (!getRestaurant) {
        return res.status(400).json({
          success: false,
          message: "Restaurante não encontrado!",
        });
      }

      const getRestaurantStaff = await staff.find({ userId });

      if (!getRestaurantStaff) {
        return res.status(401).json({
          success: false,
          message: "Você não tem permissões para editar este restaurante!",
        });
      }

      const updateRestaurant = await restaurant.updateOne(
        { _id: id },
        {
          name,
          description,
          address,
        }
      );

      await createLog(
        "updateRestaurant",
        `O utilizador ${userId} editou o restaurante ${name}.`,
        userId,
        id,
        true
      );

      res.json({
        success: true,
        message: "Restaurante editado com sucesso!",
        updateRestaurant,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao editar o restaurante.",
      });
    }
  },

  showAllIngredients: async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "ID do utilizador não recebido!",
      });
    }

    try {
      const getRestaurantStaff = await staff.find({ userId });

      if (!getRestaurantStaff) {
        return res.status(401).json({
          success: false,
          message:
            "Você não tem permissões para ver os ingredientes deste restaurante!",
        });
      }

      const getIngredients = await ingredient.find({});

      res.json({
        success: true,
        message: "Ingredientes encontrados com sucesso!",
        getIngredients,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao encontrar os ingredientes.",
      });
    }
  },
};

module.exports = restaurantStaffController;

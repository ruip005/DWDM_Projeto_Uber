const rating = require("../Models/rating");
const ratingComments = require("../Models/ratingComments");
const order = require("../Models/order");
const ingredient = require("../Models/ingredients");
const user = require("../Models/user");
const { createLog } = require("../Utils/Logs");
const { isAdmin } = require("../Utils/middleware");

const appController = {
  getCommentByCampanyId: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID da empresa não recebido!",
      });
    }

    try {
      const getRatingInfo = await rating.find({ campanyId: id });
      const getRatingComments = await ratingComments.find({
        ratingContainerId: getRatingInfo[0].ratingContainerId,
      });

      let ratingSum = 0;
      getRatingComments.forEach((comment) => {
        // Percorrer todas as notas e somar as estrelas
        ratingSum += comment.ratingStars;
      });

      const rating = Math.round(ratingSum / getRatingComments.length);

      res.json({
        success: true,
        rating,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao obter as notas.",
      });
    }
  },

  createComment: async (req, res) => {
    const { id } = req.params;
    const { userId, userOpinion, ratingStars } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID da empresa não recebido!",
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "ID do utilizador não recebido!",
      });
    }

    if (!ratingStars) {
      return res.status(400).json({
        success: false,
        message: "Estrelas não recebidas!",
      });
    }

    try {
      const getRatingInfo = await rating.find({ campanyId: id });
      const getRatingComments = await ratingComments.find({
        ratingContainerId: getRatingInfo[0].ratingContainerId,
      });

      if (getRatingComments.length > 0) {
        const checkIfUserAlreadyCommented = getRatingComments.filter(
          (comment) => comment.userId == userId
        );

        if (checkIfUserAlreadyCommented.length > 0) {
          return res.status(400).json({
            success: false,
            message: "O utilizador já comentou esta empresa!",
          });
        }
      }

      const newComment = new ratingComments({
        userId,
        userOpinion,
        ratingContainerId: getRatingInfo[0].ratingContainerId,
        ratingStars,
      });

      await newComment.save();

      await createLog(
        "createComment",
        `O utilizador ${userId} comentou a empresa ${id}, com ${ratingStars} estrelas.`,
        userId,
        id,
        false
      );

      res.json({
        success: true,
        newComment,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao criar o comentário.",
      });
    }
  },

  createIngredient: async (req, res) => {
    const {
      name,
      description,
      userId,
      data, // todo image
    } = req.body;

    if (
      !name ||
      !description ||
      !userId ||
      !data
    ) {
      return res.status(400).json({
        success: false,
        message: "Dados em falta!",
      });
    }

    try {
      if ((await isAdmin(userId)) == false) {
        return res.status(401).json({
          success: false,
          message: "Acesso negado!",
        });
      }


      const newIngredient = new ingredient({
        name,
        description,
        userId,
        //imageId: imageCreated, // N sei se está certo TO DO
      });

      await newIngredient.save();

      await createLog(
        "createIngredient",
        `O utilizador ${userId} criou o ingrediente ${name}.`,
        userId,
        null,
        true
      );

      res.json({
        success: true,
        message: "Ingrediente criado com sucesso!",
        newIngredient,
      });
    } catch (err) {
      console.log(err);
    }
  },

  deleteIngredient: async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID do ingrediente não recebido!",
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "ID do utilizador não recebido!",
      });
    }

    try {
      if ((await isAdmin(userId)) == false) {
        return res.status(401).json({
          success: false,
          message: "Acesso negado!",
        });
      }

      await ingredient.deleteOne({ _id: id });

      await createLog(
        "deleteIngredient",
        `O utilizador ${userId} eliminou o ingrediente ${id}.`,
        userId,
        null,
        true
      );

      res.json({
        success: true,
        message: "Ingrediente eliminado com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao eliminar o ingrediente.",
      });
    }
  },

  newOrder: async (req, res) => {
    const {
      userId,
      restaurantId,
      items,
      orderAddress,
      orderCity,
      orderState,
      orderZip,
      orderTotal,
      orderPaymentMethod,
    } = req.body;

    console.log(req.body);
    if (
      !userId ||
      !restaurantId ||
      !items ||
      !orderAddress ||
      !orderCity ||
      !orderState ||
      !orderZip ||
      !orderPaymentMethod
    ) {
      return res.status(400).json({
        success: false,
        message: "Dados em falta!",
      });
    }

    try {
      const utilizador = await user.find({ _id: userId });

      const newOrder = new order({
            userId,
            orderDate: Date.now(),
            orderstatus: "Pendente",
            orderItems: items,
            orderAddress,
            orderCity,
            orderState,
            orderZip,
            orderPaymentMethod, 
            campanyId: restaurantId,
            orderEmail: "example@email.com", 
            orderPhone: "123456789", 
            orderTotal,
});


      await newOrder.save();

      await createLog(
        "newOrder",
        `O utilizador ${userId} criou a encomenda ${newOrder._id} na loja ${restaurantId}.`,
        userId,
        null,
        true
      );

      res.json({
        success: true,
        message: "Encomenda criada com sucesso!",
        newOrder,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao criar a encomenda.",
      });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const allOrders = await order.find();

      res.json({
        success: true,
        orders: allOrders,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao obter todas as encomendas.",
      });
    }
  },
  
  getOrderById: async (req, res) => {
    const { orderId } = req.params;

    try {
      const foundOrder = await order.findById(orderId);

      if (!foundOrder) {
        return res.status(404).json({
          success: false,
          message: "Encomenda não encontrada.",
        });
      }

      res.json({
        success: true,
        order: foundOrder,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Ocorreu um erro ao obter a encomenda.",
      });
    }
  },


  /*
    updateOrder: async (req, res) => {
    },*/
};

module.exports = appController;

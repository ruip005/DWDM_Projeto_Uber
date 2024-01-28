const express = require("express");
const { Router } = express;
const router = Router();
const systemController = require("../Controllers/system");
const restaurantController = require("../Controllers/restaurants");
const { authenticate } = require("../Utils/middleware");
const {getImage, createImage} = require("../Controllers/images");

// App Routes
router.get("/comment/:id", systemController.getCommentByCampanyId);
router.post("/comment/:id", systemController.createComment);
router.post("/order", systemController.newOrder);
router.get("/order", systemController.getAllOrders);
router.get("/orders/:orderId", systemController.getOrderById);
router.patch("/order/:orderId", systemController.updateOrderById);
router.get("/image/:id", getImage);
router.post("/image", createImage);

module.exports = router;

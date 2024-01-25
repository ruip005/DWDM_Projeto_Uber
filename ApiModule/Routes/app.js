const express = require("express");
const { Router } = express;
const router = Router();
const systemController = require("../Controllers/system");
const restaurantController = require("../Controllers/restaurants");
const { authenticate } = require("../Utils/middleware");

// App Routes
router.get("/comment/:id", systemController.getCommentByCampanyId);
router.post("/comment/:id", systemController.createComment);
router.post("/order", systemController.newOrder);
router.get("/methods", systemController.getPaymentMethods);

// Restaurant Routes
router.get("/image", restaurantController.getBasicInfos);

module.exports = router;

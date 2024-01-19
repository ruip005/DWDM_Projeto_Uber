const express = require("express");
const { Router } = express;
const router = Router();
const restaurantController = require("../Controllers/restaurants");
const userController = require("../Controllers/users");
const { authenticate } = require("../Utils/middleware");

// Restaurante Routes
router.get("/restaurants", restaurantController.getAllRestaurants);
router.get("/restaurants/name", restaurantController.getFilteredRestaurants);
router.get("/restaurants/:id", restaurantController.getRestaurantById);
router.get("/restaurants/:id/boxes", restaurantController.getRestaurantBoxes);

// App Routes
router.get("/profile/:id", userController.getProfileById);
router.post("/profile", userController.createUserProfile);
router.put("/profile/:id", userController.updateMyUserProfile);

// User Routes
router.post("/login", userController.loginUser);
router.get("/infos", authenticate, userController.userCheckPermissions);

module.exports = router;

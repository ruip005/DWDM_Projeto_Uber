const express = require('express');
const { Router } = express;
const router = Router();
const restaurantController = require('../Controllers/restaurants');
const userController = require('../Controllers/users');

// Restaurante Routes
router.get('/restaurantes', restaurantController.getAllRestaurants);
router.get('/restaurantes/:id', restaurantController.getRestaurantById);
router.get('/restaurantes/:id/boxes', restaurantController.getRestaurantBoxes);

// App Routes
router.get('/profile/:id', userController.getProfileById);
router.post('/profile', userController.createUserProfile);
router.put('/profile', userController.updateMyUserProfile);

module.exports = router;

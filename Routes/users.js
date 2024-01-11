const express = require('express');
const { Router } = express;
const router = Router();
const restaurantController = require('../Controllers/restaurants');
const userController = require('../Controllers/users');

// Restaurante Routes
router.get('/restaurants', restaurantController.getAllRestaurants);
router.get('/restaurants/:id', restaurantController.getRestaurantById);
router.get('/restaurants/:id/boxes', restaurantController.getRestaurantBoxes);

// App Routes
router.get('/profile/:id', userController.getProfileById);
router.post('/profile', userController.createUserProfile);
router.put('/profile/:id', userController.updateMyUserProfile);

// User Routes
router.post('/users', userController.loginUser);

module.exports = router;

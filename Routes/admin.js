const express = require('express');
const { Router } = express;
const router = Router();
const restaurantController = require('../Controllers/restaurants');
const userController = require('../Controllers/users');
const { authenticate } = require('../middleware');

// Restaurante Routes
router.post('/restaurantes', authenticate, restaurantController.createRestaurant);
router.put('/restaurantes/:id', authenticate, restaurantController.updateRestaurantById);
router.delete('/restaurantes/:id', authenticate, restaurantController.deleteRestaurantById);
router.get('/restaurantes/admins/', authenticate, restaurantController.getRestaurantAdmins);
router.post('/restaurantes/admins/', authenticate, restaurantController.addAdminsToRestaurant);
router.delete('/restaurantes/admins/:id', authenticate, restaurantController.deleteRestaurantAdmin);

// User Routes
router.get('/users', authenticate, userController.getAllUsers);
router.put('/users/:id', authenticate, userController.updateUserById);
router.delete('/users/:id', authenticate, userController.deleteUserById);
router.post('/users/admins/:userId', authenticate, userController.deleteUserById);

module.exports = router;

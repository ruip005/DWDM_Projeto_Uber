const express = require('express');
const { Router } = express;
const router = Router();
const restaurantController = require('../Controllers/restaurants');
const userController = require('../Controllers/users');
const appController = require('../Controllers/system');
const { authenticate } = require('../Utils/middleware');

// Restaurante Routes
router.post('/restaurants', authenticate, restaurantController.createRestaurant);
router.put('/restaurants/:id', authenticate, restaurantController.updateRestaurantById);
router.delete('/restaurants/:id', authenticate, restaurantController.deleteRestaurantById);
router.get('/restaurants/admins/', authenticate, restaurantController.getRestaurantAdmins);
router.post('/restaurants/admins/', authenticate, restaurantController.addAdminsToRestaurant);
router.delete('/restaurants/admins/:id', authenticate, restaurantController.deleteRestaurantAdmin);

// User Routes
router.get('/users', authenticate, userController.getAllUsers);
router.put('/users/:id', authenticate, userController.updateUserById);
router.delete('/users/:id', authenticate, userController.deleteUserById);
router.post('/users/admins/:userId', authenticate, userController.deleteUserById);

// App Routes
router.post('/ingredient', authenticate, appController.createIngredient);
router.delete('/ingredient/:id', authenticate, appController.deleteIngredient);

module.exports = router;

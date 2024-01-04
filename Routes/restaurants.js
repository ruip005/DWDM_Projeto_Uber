const express = require('express');
const { Router } = express;
const router = Router();
const restaurantController = require('../Controllers/restaurants');

router.get('/restaurantes', restaurantController.getAllRestaurants);
router.post('/restaurantes', restaurantController.createRestaurant);


module.exports = router;

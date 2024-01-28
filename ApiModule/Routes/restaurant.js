const express = require("express");
const { Router } = express;
const router = Router();
const staffController = require("../Controllers/restaurantsStaff");

// Restaurant Staff Routes
router.post("/product", staffController.createNewProduct);
router.put("/product/:id", staffController.updateProduct);
router.delete("/product/:id", staffController.deleteProduct);
router.put("/campany/:id", staffController.updateRestaurant);
router.get("/ingredients", staffController.showAllIngredients);
router.get("/products/:id", staffController.getProducts); //by restaurant id
router.get("/product/:productId", staffController.getProductById); //by product id

module.exports = router;

const express = require('express');
const { getAllPizzas } = require('../controllers/pizzaController');
const router = express.Router();

router.route('/').get(getAllPizzas);

module.exports = router;

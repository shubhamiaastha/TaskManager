const express = require('express');
const categoryRouter = express.Router();
const auth = require('../middle/auth');
const { createCategory, getCategory } = require('../controllers/categoryController');

categoryRouter.post('/', auth ,createCategory)
categoryRouter.get('/', getCategory)



module.exports = categoryRouter;
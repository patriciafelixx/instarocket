const express = require('express');
const routes = express.Router();

const multer = require('multer');
const multerConfig = require('./config/multer');
const upload = multer(multerConfig);

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

routes.post('/posts', upload.single('image'), PostController.store);
routes.get('/posts', PostController.index);
routes.delete('/posts/:id/delete', PostController.delete);

routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;
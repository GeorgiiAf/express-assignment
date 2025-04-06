import {
  deleteCat,
  getCat,
  getCatById,
  postCat,
  putCat,
  getCatsByUser
} from '../controllers/cat-controller.js';
import { authenticateToken } from '../../middlewares.js';
import { createThumbnail } from '../../middlewares.js';
import express from 'express';
import multer from 'multer';

const catRouter = express.Router();

const upload = multer({ dest: 'uploads/' });

catRouter
  .route('/')
  .get(getCat)
  .post(upload.single('file'), createThumbnail, postCat);



catRouter
  .route("/:id")
  .get(getCatById)
  .put(authenticateToken, putCat)
  .delete(authenticateToken, deleteCat);

catRouter.route('/owner/:id')
  .get(authenticateToken, getCatsByUser);


export default catRouter;
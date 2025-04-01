import { Router } from 'express';
import {
    getAllCats,
    getCatById,
    addCat,
    updateCat,
    deleteCat
} from '../controllers/catController.js';

const router = Router();

router.get('/', getAllCats);
router.get('/:id', getCatById);
router.post('/', addCat);
router.put('/:id', updateCat);
router.delete('/:id', deleteCat);

export default router;
import { Router } from 'express';
import { getFilteredProducts } from '../controllers/prismaProductController';


const router = Router();
router.get('/filter', getFilteredProducts);
export default router;
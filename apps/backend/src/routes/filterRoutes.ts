import express from 'express';
import { getFilters } from '../controllers/filterController';

const router = express.Router();

router.get('/', getFilters);

export default router;
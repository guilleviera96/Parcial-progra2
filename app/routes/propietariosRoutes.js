import express from 'express';
import { crearPropietarioController } from '../controller/propietarioController.js';

const router = express.Router();    
//crear propietario
router.post('/', crearPropietarioController);
export default router;
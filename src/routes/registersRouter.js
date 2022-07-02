import { getRegisters, registerIncome, registerExpense } from '../controllers/registersController.js';
import validateUser from '../middlewares/validateUser.js';
import { Router } from 'express';

const router = Router();

router.get('/mywallet', validateUser, getRegisters);
router.post('/newincome', validateUser, registerIncome);
router.post('/newexpense', validateUser, registerExpense);

export default router;
import { getRegisters, registerIncome, registerExpense } from '../controllers/registersController.js';
import validateUser from '../middlewares/validateUser.js';
import { Router } from 'express';

const router = Router();

router.get('/mywallet', validateUser, getRegisters);
router.post('/newincome', registerIncome);
router.post('/newexpense', registerExpense);

export default router;
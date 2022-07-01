import { loginUser, signUpUser } from '../controllers/authController.js';
import { Router } from 'express';

const router = Router();

router.post('/', loginUser);
router.post('/signup', signUpUser);

export default router;
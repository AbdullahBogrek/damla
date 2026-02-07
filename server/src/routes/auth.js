import express from 'express';
const router = express.Router();

import auth from '../controllers/auth';
import { verifyAccessToken } from '../helpers/jwt';

router.post('/register', auth.Register);
router.post('/login', auth.Login);
router.post('/refresh_token', auth.RefreshToken);
router.post('/logout', auth.Logout);
router.get('/me', verifyAccessToken, auth.Me);
router.get('/', verifyAccessToken, auth.GetUsers);
router.put('/:user_id', verifyAccessToken, auth.Update);
router.put('/password/:user_id', verifyAccessToken, auth.UpdatePassword);
router.delete("/:user_id", verifyAccessToken, auth.Delete);

export default router;

import { Router } from 'express';

// helpers
import { verifyAccessToken } from '../helpers/jwt';

// routes
import auth from './auth';
import help from './help';
import imkan from './imkan';
import order from './order';
import product from './product';
import talep from './talep';

const router = Router();

router.get('/', (req, res) => {
  res.end('hey');
});

router.use('/auth', auth);
router.use('/help', help);
router.use('/talep', talep);
router.use('/imkan', imkan);
router.use('/product', product);
router.use('/order', verifyAccessToken, order);


export default router;
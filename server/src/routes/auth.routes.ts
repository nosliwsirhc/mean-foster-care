import { Request, Response, Router, NextFunction } from 'express';
import AuthController from '../controllers/auth.controller';
import passport from '../_middleware/passport';
import { upload } from '../_middleware/multer';

const router = Router();

router.post('/authenticate', AuthController.authenticate);

router.post('/register', upload.single('picture'), AuthController.register);

router.post('/refresh-auth', AuthController.refreshAuth);

router.delete('/logout', AuthController.logout);

router.delete(
  '/revoke-token/:id',
  passport.authenticate('jwt', { session: false }),
  AuthController.revokeToken
);

export default router;

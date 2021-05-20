import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import passport from '../_middleware/passport';
import { upload } from '../_middleware/multer';

const router = Router();

/**
 * GET USER PROFILE
 */
router.get(
  '/profile/:id',
  passport.authenticate('jwt', { session: false }),
  UserController.getOwnUser
);

/**
 * CHANGE USER PASSWORD
 */
router.patch(
  '/change-password/:id',
  passport.authenticate('jwt', { session: false }),
  UserController.changePassword
);

/**
 * CHANGE USER PROFILE PICTURE
 */
router.patch(
  '/change-profile-picture/:id',
  passport.authenticate('jwt', { session: false }),
  upload.single('picture'),
  UserController.changeProfilePic
);

export default router;

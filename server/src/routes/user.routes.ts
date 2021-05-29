import { Router } from 'express'
import * as UserController from '../controllers/user.controller'
import passport from '../_middleware/passport'
import { upload } from '../_middleware/multer'

const router = Router()

/**
 * GET ALL USERS
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  UserController.getUsers
)

/**
 * GET USER PROFILE
 */
router.get(
  '/profile/:id',
  passport.authenticate('jwt', { session: false }),
  UserController.getUser
)

/**
 * GET MANAGERS
 */
router.get(
  '/managers',
  passport.authenticate('jwt', { session: false }),
  UserController.getManagers
)

/**
 * CHANGE USER PASSWORD
 */
router.patch(
  '/change-password/:id',
  passport.authenticate('jwt', { session: false }),
  UserController.changePassword
)

/**
 * CHANGE USER PROFILE PICTURE
 */
router.patch(
  '/change-profile-picture/:id',
  passport.authenticate('jwt', { session: false }),
  upload.single('picture'),
  UserController.changeProfilePic
)

export default router

import { Router } from 'express'
import passport from '../_middleware/passport'
import FosterHomeController from '../controllers/foster-home.controller'

const router = Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  FosterHomeController.createFosterHome
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  FosterHomeController.listFosterHomes
)

router.get(
  '/profile/:id',
  passport.authenticate('jwt', { session: false }),
  FosterHomeController.getFosterHome
)

export default router

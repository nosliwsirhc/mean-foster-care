import { Router } from 'express'
import ClientController from '../controllers/client.controller'
import passport from '../_middleware/passport'

const router = Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  ClientController.createClient
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  ClientController.listClients
)

router.get(
  '/profile/:id',
  passport.authenticate('jwt', { session: false }),
  ClientController.getClient
)

export default router

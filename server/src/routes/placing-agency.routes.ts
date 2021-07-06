import { Request, Response, Router } from 'express'
import passport from '../_middleware/passport'
import placingAgencyController from '../controllers/placing-agency.controller'

const router = Router()

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  placingAgencyController.listPlacingAgencies
)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  placingAgencyController.createPlacingAgency
)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  placingAgencyController.getPlacingAgency
)

export default router

import { Request, Response, Router } from 'express'
import passport from '../_middleware/passport'
import PlacingAgency, { IPlacingAgency } from '../models/placing-agency.model'
import { newPlacingAgencySchema } from '../controllers/validators.ts/placing-agency.validators'

const router = Router()

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const placingAgencies = await PlacingAgency.find().sort({ name: 'asc' })
    res.json(placingAgencies)
  }
)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const placingAgencyBody: IPlacingAgency = req.body
    if (!newPlacingAgencySchema.validate(placingAgencyBody)) {
      return res.status(400).json({ message: "This doesn't work..." })
    }
    try {
      const newPlacingAgency = new PlacingAgency(placingAgencyBody)
      await newPlacingAgency.save()
      res.json(newPlacingAgency)
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  }
)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const placingAgencyId = req.params.id
    if (!placingAgencyId) return res.status(404).json({ message: 'Not Found' })
    try {
      const placingAgency = await PlacingAgency.findById(placingAgencyId)
      res.json(placingAgency)
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  }
)

export default router

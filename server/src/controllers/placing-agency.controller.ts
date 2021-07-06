import { Request, Response } from 'express'
import PlacingAgency, { IPlacingAgency } from '../models/placing-agency.model'
import { newPlacingAgencySchema } from './validators/placing-agency.validators'

export const listPlacingAgencies = async (req: Request, res: Response) => {
  try {
    const placingAgencies = await PlacingAgency.find().sort({ name: 'asc' })
    res.json(placingAgencies)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

export const createPlacingAgency = async (req: Request, res: Response) => {
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

export const getPlacingAgency = async (req: Request, res: Response) => {
  const placingAgencyId = req.params.id
  if (!placingAgencyId) return res.status(404).json({ message: 'Not Found' })
  try {
    const placingAgency = await PlacingAgency.findById(
      placingAgencyId
    ).populate({
      path: 'activePlacements',
      populate: { path: 'client', select: 'nameGiven nameFamily' },
    })
    res.json(placingAgency)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export default {
  listPlacingAgencies,
  createPlacingAgency,
  getPlacingAgency,
}

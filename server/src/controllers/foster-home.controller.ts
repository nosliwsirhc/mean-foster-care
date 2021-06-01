import { Request, Response } from 'express'
import FosterHome from '../models/foster-home.model'

export const createFosterHome = async (req: Request, res: Response) => {
  try {
    const fosterHomeBody = req.body
    // !!! Run validation before production !!!
    const fosterHome = new FosterHome(fosterHomeBody)
    await fosterHome.save()
    res.status(201).json(fosterHome)
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
}

export const listFosterHomes = async (req: Request, res: Response) => {
  try {
    const fosterHomes = await FosterHome.find().sort({ name: 1 })
    res.json(fosterHomes)
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
}

export const getFosterHome = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const fosterHome = await FosterHome.findOne({ _id: id })
    res.json(fosterHome)
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
}

export default {
  createFosterHome,
  listFosterHomes,
  getFosterHome,
}

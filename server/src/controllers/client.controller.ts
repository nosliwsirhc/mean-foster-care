import { Request, Response } from 'express'
import Client from '../models/client.model'
import PlacingAgency from '../models/placing-agency.model'

export const createClient = async (req: Request, res: Response) => {
  try {
    const clientBody = req.body
    // !!! Run validation before production !!!
    const client = new Client(clientBody)
    await client.save()
    const pa = await PlacingAgency.findOne({
      _id: client.currentPlacement.placingAgency,
    })
    pa.activePlacements.push({
      client: client._id,
      fosterHome: client.currentPlacement.fosterHome,
      dateOfPlacement: client.currentPlacement.dateOfPlacement,
    })
    await pa.save()
    res.status(201).json(client)
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
}

export const listClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find().sort({ nameGiven: 1 })
    res.json(clients)
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
}

export const getClient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const client = await Client.findOne({ _id: id })
    res.json(client)
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
}

export default {
  createClient,
  listClients,
  getClient,
}

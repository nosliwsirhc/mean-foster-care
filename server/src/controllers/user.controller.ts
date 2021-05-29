import { Request, Response } from 'express'
import User from '../models/user.model'
import { uploadFile, deleteFile } from '../_helpers/s3'
import { changePasswordSchema } from './validators.ts/user.validators'

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.user
    await changePasswordSchema.validateAsync(req.body)
    const { oldPassword, newPassword, newPasswordConfirm } = req.body
    const user = await User.findById(userId)
    if (!user) return res.sendStatus(404)
    if (newPassword === oldPassword) return res.sendStatus(406)
    await user.changePassword(oldPassword, newPassword)
    await user.save()
    res.json({ message: 'Password changed' })
  } catch (error) {
    res.sendStatus(500)
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const requestingUser = await User.findOne({ _id: req.user })
    if (!requestingUser || !requestingUser.isManager)
      return res.status(401).json({ message: 'Not authorized' })
    const users = await User.find({ isActive: true }).sort({ nameGiven: 1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const requestingUser = await User.findOne({ _id: req.user })
    const userParam = req.params.id
    if (
      !requestingUser ||
      (requestingUser._id !== userParam && !requestingUser.isManager)
    ) {
      return res.sendStatus(403)
    }
    const user = await User.findOne({ _id: userParam })
    if (!user) return res.sendStatus(404)
    const userJson = user.toJSON()
    res.json(userJson)
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
}

export const changeProfilePic = async (req: Request, res: Response) => {
  try {
    const userId = req.user
    const user = await User.findOne({ _id: userId })
    if (!user) return res.status(404).json({ message: 'User not found.' })
    const currentPic = user.picture
    const newPic = req.file.path
    // @ts-ignore
    const fileResult = await uploadFile(req.file)
    user.picture = fileResult.Key
    await Promise.all([deleteFile(currentPic), user.save()])
    res.json(user.toJSON())
  } catch (error) {
    res.status(500).json({ message: 'Server Error.' })
  }
}

export const getManagers = async (req: Request, res: Response) => {
  try {
    const managers = await User.find(
      { isManager: true },
      '_id nameGiven nameMiddle nameFamily'
    ).sort({
      fullName: 'asc',
    })
    console.log(managers)
    res.json(managers)
  } catch (error) {
    res.status(500).json({ message: 'Server Error.' })
  }
}

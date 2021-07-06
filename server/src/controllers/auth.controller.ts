import { NextFunction, Request, Response } from 'express'
import User, { IUser } from '../models/user.model'
import {
  issueAccessJwt,
  issueRefreshJwt,
  refreshAuthJwts,
  revokeRefreshTokenByToken,
  revokeRefreshTokenByUserId,
} from '../_helpers/auth.helper'
import { loginSchema, registerSchema } from './validators/auth.validators'
import { uploadFile } from '../_helpers/s3'
import fs from 'fs'
import util from 'util'
const unlinkFile = util.promisify(fs.unlink)

interface IRegisterUser extends IUser {
  passwordConfirm: string
}

const authenticate = async (req: Request, res: Response) => {
  try {
    const credentials = req.body
    await loginSchema.validateAsync(credentials)
    const user = await User.findOne({
      email: credentials.email.toLowerCase().trim(),
    }).populate('manager')
    if (!user) {
      return res.sendStatus(404)
    }
    const authenticated = await user.isValidPassword(credentials.password)
    if (!authenticated) {
      return res.sendStatus(401)
    } else {
      const accessToken = issueAccessJwt(user.id)
      const refreshToken = issueRefreshJwt(user.id)
      res.json({
        user: user.toJSON(),
        accessJwt: accessToken.accessJwt,
        accessExp: accessToken.accessExp,
        refreshJwt: refreshToken.refreshJwt,
        refreshExp: refreshToken.refreshExp,
      })
    }
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const register = async (req: Request, res: Response) => {
  try {
    const user = req.body as IRegisterUser
    console.log(user)
    user.picture = req.file.path
    if (user.nameMiddle === 'null') {
      user.nameMiddle = undefined
    }
    await registerSchema.validateAsync(user)
    const userExists = await User.findOne({
      email: user.email.toLowerCase().trim(),
    })
    if (userExists) return res.sendStatus(409)
    const file = req.file
    // @ts-ignore
    const fileResult = await uploadFile(file)
    user.picture = fileResult.Key
    await unlinkFile(file.path)
    const newUser = new User(user)
    await newUser.save()
    res.status(201).json({ userId: newUser._id })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const refreshAuth = async (req: Request, res: Response) => {
  const { refreshToken } = req.body
  if (!refreshToken) {
    return res.sendStatus(400)
  }
  const newTokens = refreshAuthJwts(refreshToken)
  if (!newTokens) {
    return res.sendStatus(403)
  }
  const user = await User.findOne({ _id: newTokens.userId })
  if (!user || !user.isActive) {
    return res.sendStatus(403)
  }
  res.json({
    user: user.toJSON(),
    accessJwt: newTokens.newAccessToken.accessJwt,
    accessExp: newTokens.newAccessToken.accessExp,
    refreshJwt: newTokens.newRefreshToken.refreshJwt,
    refreshExp: newTokens.newRefreshToken.refreshExp,
  })
}

const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.headers['x-refresh-token'] as string
    if (!refreshToken) {
      res.sendStatus(403)
    } else {
      await revokeRefreshTokenByToken(refreshToken)
      // Angular has parser errors if no JSON is returned
      res.json({ message: 'Refresh Token Revoked' })
    }
  } catch (error) {
    res.sendStatus(500)
  }
}

const revokeToken = async (req: Request, res: Response) => {
  try {
    const userId = req.user
    const user = await User.findById(userId).lean()
    if (!user) {
      return res.sendStatus(404)
    }
    const isAdmin = user.roles.includes('admin')
    if (!isAdmin) {
      return res.sendStatus(403)
    }
    const revokeUserId = req.params.id
    if (!revokeUserId) {
      return res.sendStatus(400)
    }
    await revokeRefreshTokenByUserId(revokeUserId)
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
}

const resetPassword = async (req: Request, res: Response) => {
  // This needs a LOT of thought as the requests will come from unauthenticated users
  // Should I implement text messages or emails?
}

export default {
  authenticate,
  register,
  refreshAuth,
  logout,
  revokeToken,
}

import express, { Router } from 'express'
import authRoutes from './auth.routes'
import usersRoutes from './user.routes'
import placingAgencyRoutes from './placing-agency.routes'
import fileRoutes from './file.routes'
import path from 'path'

const router = Router()

router.use('/api/auth', authRoutes)
router.use('/api/users', usersRoutes)
router.use('/api/placing-agencies', placingAgencyRoutes)
router.use('/api/file-fetch', fileRoutes)
router.use('/', express.static(path.join(__dirname, '..', 'public')))

export default router

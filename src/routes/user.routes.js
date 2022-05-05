import { Router } from 'express'
import { createUser } from '../controllers/users.controller'
import { authJwt, verifySignup } from '../middlewares'
const router = Router()

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted], createUser)

export default router
